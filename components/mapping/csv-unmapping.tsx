"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import mappingAtom from "@/atoms/mappingAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Papa from "papaparse";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useCSVUnmapping from "@/hooks/queries/mapping/useCSVUnmapping";
import { Button } from "@/components/ui/button";

import FileInput from "../core/file-input";
import { Form } from "../ui/form";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
  productCSV: z.any({ required_error: "Please select a .csv file" }).array(),
});

export default function CSVUnmapping() {
  const [, setMapping] = useAtom(mappingAtom);
  const [failedSkus, setFailedSkus] = useState([]);

  const channelUid = useParams().channel_uid as string;

  const { userInformation } = useAuth();

  const { mutate: triggerCSVUnmapped, isLoading } = useCSVUnmapping();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const file = formData.productCSV[0];

    Papa.parse(file, {
      transformHeader: (header) => {
        return header.trim();
      },
      transform: (data) => {
        return data.trim();
      },
      header: false,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<string[]>) => {
        if (results.data.length === 0) {
          return toast({
            variant: "destructive",
            title: "No data found",
            description: "Please check your csv file and try again.",
          });
        }

        const data = results.data.flat().map((val) => val.trim());

        const payload = {
          data,
          channelUid,
          companyUuid: userInformation?.company_uid as string,
        };

        triggerCSVUnmapped(payload, {
          onSuccess: (res) => {
            if (res.data.failed_skus.length === 0 && res.data.deleted_skus.length === 0) {
              toast({
                title: "Failed",
                description: res?.data?.message,
                variant: "destructive",
              });
            }

            if (res.data.failed_skus.length) {
              setFailedSkus(res.data.failed_skus);
            } else {
              setMapping((prev) => ({ ...prev, isSmartMappingProductModalOpen: false }));
              toast({
                title: "Success",
                description: res?.data?.message,
                variant: "default",
              });
            }
          },
        });
      },
    });
  }

  return (
    <section className="mt-4 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FileInput accept={{ "text/csv": [] }} name="productCSV" />
          <section className="flex justify-between">
            <section className="flex gap-2">
              <Button
                variant="secondary"
                type="button"
                className="bg-slate-100 text-slate-900"
                onClick={() => window.open("/files/csv_unmapping_demo_file.csv")}
              >
                CSV Demo
              </Button>
            </section>
            <section className="space-x-2">
              <Button loading={isLoading} type="submit" disabled={isLoading}>
                Submit
              </Button>
            </section>
          </section>
        </form>
      </Form>
      {failedSkus?.length > 0 && (
        <div>
          <p className="text-sm">Failed Items</p>
          <div className="flex max-h-40 flex-wrap gap-2 rounded-lg bg-gray-50 p-4">
            {failedSkus?.map((e: any, i: number) => (
              <span
                key={i}
                className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-medium text-red-800 shadow-sm transition-colors hover:bg-red-200"
              >
                {e?.sku}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
