"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Papa from "papaparse";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useUpdateStockByChannel from "@/hooks/queries/inventory/use-update-stock-by-channel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import FileInput from "@/components/core/file-input";

const FormSchema = z.object({
  productCSV: z.any({ required_error: "Please select a .csv file" }).array(),
});

type Props = {
  isOpenCSVStockDialog: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpenCSVStockDialog: (value: boolean) => void;
  channelUid: string;
};

export default function CSVStockUpdateDialog({
  isOpenCSVStockDialog,
  setIsOpenCSVStockDialog,
  channelUid,
}: Props) {
  const { userInformation } = useAuth();

  const { mutate, isLoading } = useUpdateStockByChannel();

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
          company_uid: userInformation?.company_uid as string,
          channel_uid: channelUid,
          body: {
            skus: data,
          },
        };

        mutate(payload, {
          onSuccess: () => {
            form.reset();
            setIsOpenCSVStockDialog(false);
          },
        });
      },
    });
  }

  return (
    <Dialog
      open={isOpenCSVStockDialog}
      onOpenChange={(open) => {
        console.log({ open });
        setIsOpenCSVStockDialog(open);
      }}
    >
      <DialogContent className="w-[500px] sm:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>CSV Stock Update</DialogTitle>
          <DialogDescription>
            Upload a CSV file with SKUs to update stock for this channel.
          </DialogDescription>
        </DialogHeader>

        <section className="mt-4 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FileInput accept={{ "text/csv": [] }} name="productCSV" />

              <section className="flex justify-between">
                <Button
                  variant="secondary"
                  type="button"
                  className="bg-slate-100 text-slate-900"
                  onClick={() => window.open("/files/csv_unmapping_demo_file.csv")}
                >
                  CSV Demo
                </Button>

                <section className="space-x-2">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setIsOpenCSVStockDialog(false)}
                  >
                    Cancel
                  </Button>

                  <Button loading={isLoading} type="submit" disabled={isLoading}>
                    Submit
                  </Button>
                </section>
              </section>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
