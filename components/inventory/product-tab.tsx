"use client";

import { useRef } from "react";
import { useInventoryAtom } from "@/atoms/inventoryAtom";
import type { CsvFields } from "@/schema/product";
import { removeSpecialChar } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useCreateManyProducts from "@/hooks/queries/product/use-create-many-products";
import useGetProducts from "@/hooks/queries/product/use-get-products";
import { Button } from "@/components/ui/button";

import FileInput from "../core/file-input";
import { Form } from "../ui/form";

const FormSchema = z.object({
  productCSV: z.any({ required_error: "Please select a .csv file" }).array(),
});

type Props = {
  dashboard?: boolean;
  handleContinue?: () => void;
};

export default function ProductTab(props: Props) {
  const { userInformation } = useAuth();
  const { setInventoryStore } = useInventoryAtom();

  const { data: products } = useGetProducts();
  const { mutate: createManyProducts, isLoading } = useCreateManyProducts();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const csvData =
    products?.map((product) => {
      return {
        id: product?.id,
        name: product?.name,
        sku: product?.sku,
        barcode: product?.barcode,
        is_composite: product?.is_composite,
        purchase_price: product?.purchase_price,
        selling_price: product?.selling_price,
        weight: product?.weight,
        height: product?.height,
        width: product?.width,
        depth: product?.depth,
      };
    }) ?? [];

  function downloadReport() {
    if (csvLink?.current) {
      csvLink?.current?.link?.click();
    }
  }

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (props?.dashboard) {
      if (props?.handleContinue) {
        props?.handleContinue();
      }
    } else {
      const file = formData?.productCSV[0];

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => {
          return header?.trim()?.replace(/\s*\(.*?\)\s*/g, "");
        },
        transform: (data) => data?.trim(),
        complete: (results: Papa.ParseResult<CsvFields>) => {
          const payload = results?.data?.map((product) => ({
            ...product,
            company_uid: userInformation?.company_uid,
          }));
          createManyProducts(removeSpecialChar(payload), {
            onSettled: () => {
              setInventoryStore((prev) => ({
                ...prev,
                isSettingsSheetOpen: false,
              }));
            },
          });
        },
      });
    }
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
                  onClick={() => window.open("/files/product-demo.csv")}
                >
                  CSV Demo
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  className="bg-slate-100 text-slate-900"
                  onClick={downloadReport}
                >
                  CSV Export
                </Button>
              </section>
              <section className="space-x-2">
                {props?.dashboard && (
                  <Button
                    type="button"
                    className="bg-newPrimary"
                    onClick={props.handleContinue}
                  >
                    Setup Later
                  </Button>
                )}
                <Button
                  loading={isLoading}
                  type="submit"
                  variant="dark"
                  disabled={isLoading}
                >
                  {props?.dashboard ? "Continue" : "Import"}
                </Button>
              </section>
            </section>
          </form>
        </Form>
      </section>
      <CSVLink data={csvData} filename="product.csv" ref={csvLink} />
    </>
  );
}
