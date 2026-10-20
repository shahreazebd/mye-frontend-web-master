"use client";

import productsAtom from "@/atoms/productsAtom";
import type { UpdateCsvFields } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Papa from "papaparse";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useUpdateSku from "@/hooks/queries/product/useUpdateSku";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

import FileInput from "../../core/file-input";
import { Form } from "../../ui/form";

const FormSchema = z.object({
  productCSV: z
    .any()
    .refine((files) => files?.length > 0, {
      message: "Please select a .csv file",
    })
    .refine(
      (files) => {
        if (!files || files.length === 0) return false;
        const file = files[0];
        return file.type === "text/csv" || file.name.endsWith(".csv");
      },
      { message: "Only CSV files are allowed" }
    ),
});

type NullableFields<T> = {
  [K in keyof T]: T[K] | null;
};

function removeNullableFields<T>(data: Array<NullableFields<T>>): T[] {
  return data.map((item) => {
    const entries = Object.entries(item) as [keyof T, T[keyof T] | null][];
    const filteredEntries = entries.filter(([_, value]) => value !== null);
    return Object.fromEntries(filteredEntries) as T;
  });
}

export default function MultipleProductUpdateSheet() {
  const { toast } = useToast();
  const [product, setProduct] = useAtom(productsAtom);
  const { userInformation } = useAuth();
  const { mutate: updateSku } = useUpdateSku();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    const file = formData.productCSV[0];

    Papa.parse(file, {
      transformHeader: (header) => header.trim(),
      transform: (data) => (typeof data === "string" ? data.trim() : data),
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<UpdateCsvFields>) => {
        // ✅ Required CSV headers
        const requiredHeaders = [
          "sku",
          "new_sku",
          "name",
          "height",
          "width",
          "depth",
          "purchase_price",
          "selling_price",
          "barcode",
        ];

        // Extract headers from parsed result
        const csvHeaders = results.meta.fields?.map((f) => f.trim()) || [];

        // Check missing headers
        const missingHeaders = requiredHeaders.filter(
          (header) => !csvHeaders.includes(header)
        );

        if (missingHeaders.length > 0) {
          toast({
            title: "Invalid CSV file!",
            description: `Missing columns: ${missingHeaders.join(", ")}`,
            variant: "destructive",
          });
          return; // ⛔ stop further execution
        }

        // ✅ If headers are valid, process data
        const payload = {
          data: removeNullableFields(results.data).map((e) => ({ ...e })),
          company_uid: userInformation?.company_uid,
        };

        updateSku(payload as any, {
          onSuccess: () => {
            toast({
              title: "Products updated successfully!",
              variant: "default",
            });
            form.reset();
            sheetClose();
          },
          onError: () => {
            toast({
              title: "Network Error!",
              variant: "destructive",
            });
          },
        });
      },
    });
  }

  const sheetClose = () => {
    setProduct((prev) => ({
      ...prev,
      isMultipleProductEditSheet: false,
    }));
  };

  return (
    <Sheet open={product.isMultipleProductEditSheet} onOpenChange={sheetClose}>
      <SheetContent className="w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Update Multiple Products</SheetTitle>
          <section className="mt-4 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FileInput accept={{ "text/csv": [] }} name="productCSV" />

                {/* 🧾 Show error message if wrong file uploaded */}
                {/* {form.formState.errors.productCSV && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.productCSV.message as string}
                  </p>
                )} */}

                <section className="flex justify-between">
                  <section className="flex gap-2">
                    <Button
                      variant="secondary"
                      type="button"
                      className="bg-slate-100 text-slate-900"
                      onClick={() => window.open("/files/update_sku_demo.csv")}
                    >
                      CSV Demo
                    </Button>
                  </section>
                  <section className="space-x-2">
                    <Button type="submit" variant="dark">
                      Update
                    </Button>
                  </section>
                </section>
              </form>
            </Form>
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
