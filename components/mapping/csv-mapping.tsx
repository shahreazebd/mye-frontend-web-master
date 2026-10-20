"use client";

import mappingAtom from "@/atoms/mappingAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Papa from "papaparse";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useCSVMapping from "@/hooks/queries/mapping/useCSVMapping";
import { Button } from "@/components/ui/button";

import FileInput from "../core/file-input";
import { Form } from "../ui/form";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
  productCSV: z.any({ required_error: "Please select a .csv file" }).array(),
});

interface CsvFields {
  local_product_sku: string;
  remote_product_sku: string;
}

export default function CSVMapping({ channel_uid }: { channel_uid: string }) {
  const { userInformation } = useAuth();
  const { mutate: csvMap, isLoading } = useCSVMapping(channel_uid);

  const queryClient = useQueryClient();

  const [, setMapping] = useAtom(mappingAtom);

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
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<CsvFields>) => {
        if (results.data.length === 0) {
          return toast({
            variant: "destructive",
            title: "No data found",
            description: "Please check your csv file and try again.",
          });
        }
        const payload = {
          data: results.data,
          company_uid: userInformation?.company_uid,
          channel_uid,
        };

        csvMap(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries(["remote-product-mapping-data"]);
            setMapping((prev) => ({ ...prev, isSmartMappingProductModalOpen: false }));
          },
        });
      },
    });
  }

  return (
    <>
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
                  onClick={() => window.open("/files/csv_mapping_demo_file.csv")}
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
      </section>
    </>
  );
}
