"use client";

import { useRef, useState } from "react";
import { useInventoryAtom } from "@/atoms/inventoryAtom";
import { useLocationAtom } from "@/atoms/locationAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { RotateCw } from "lucide-react";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import * as z from "zod";

import getInventories from "@/lib/get-inventories";
import useAuth from "@/hooks/custom/useAuth";
import useUpdateReturnedStock from "@/hooks/queries/inventory/use-update-returned-stock";
import useAddStock from "@/hooks/queries/inventory/useAddStock";
import useSubtractStock from "@/hooks/queries/inventory/useSubtractStock";
import useUpdateFullStock from "@/hooks/queries/inventory/useUpdateFullStock";
import useGetLocations from "@/hooks/queries/location/useGetLocations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FileInput from "../core/file-input";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  location: z.string({ required_error: "Please select a location" }),
  action: z.string({ required_error: "Please select a action" }),
  csvFiles: z.any({ required_error: "Please select a .csv file" }).array(),
});

type Props = {
  dashboard?: boolean;
  handleContinue?: () => void;
};

type CsvDataType = {
  sku: string;
  product_quantity: number;
};

export default function InventoryTab(props: Props) {
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const { setInventoryStore } = useInventoryAtom();

  const { locationDetails } = useLocationAtom();

  const { toast } = useToast();

  const [csvData, setCsvData] = useState(
    [] as {
      id: number;
      location: string;
      name: string;
      sku: string;
      stock_level: number;
      in_open: number;
      available: number;
    }[]
  );
  const [inventoryCsvExportLoading, setInventoryCsvExportLoading] = useState(false);

  const { data: locations } = useGetLocations();
  const { mutate: updateFullStock, isLoading: updateIsLoading } = useUpdateFullStock();
  const { mutate: addStock, isLoading: addIsLoading } = useAddStock();
  const { mutate: subtractStock, isLoading: subtractIsLoading } = useSubtractStock();
  const { mutate: updateReturnedStock, isLoading: returnedStockIsLoading } =
    useUpdateReturnedStock();

  const { userInformation } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (props?.dashboard) {
      if (props?.handleContinue) {
        props?.handleContinue();
      }
    } else {
      const file = formData?.csvFiles[0];

      Papa.parse(file, {
        transformHeader: (header) => {
          return header?.trim();
        },
        transform: (data) => {
          return data?.trim();
        },
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<CsvDataType>) => {
          const verdict = results?.data?.every((e) => {
            if (e?.product_quantity !== null && e?.product_quantity >= 0) {
              return true;
            } else {
              toast({
                title: "Try Again",
                description:
                  "Product quantity is not valid. Check the values, it cannot be blank or negative",
                variant: "destructive",
              });

              return false;
            }
          });

          if (verdict) {
            const payload = results?.data?.map((e) => {
              return {
                ...e,
                company_uid: userInformation?.company_uid,
                location_id: +formData?.location,
              };
            });

            if (formData?.action === "fullStock") updateFullStock(payload);
            else if (formData?.action === "addStock") addStock(payload);
            else if (formData?.action === "subStock") subtractStock(payload);
            else updateReturnedStock(payload);

            setInventoryStore((prev) => ({ ...prev, isSettingsSheetOpen: false }));
          }
        },
      });
    }
  }

  async function csvExportHandler() {
    try {
      setInventoryCsvExportLoading(true);
      const inventories = await getInventories({
        locationId: +locationDetails?.locationId,
      });

      const mapped =
        inventories?.data?.map((e) => {
          return {
            id: e?.id,
            location: inventories?.location?.name,
            name: e?.local_product?.name,
            sku: e?.local_product?.sku,
            stock_level: e?.stock_level,
            in_open: e?.in_open,
            available: e?.stock_level - e?.in_open,
          };
        }) ?? [];

      setCsvData(mapped);

      setInventoryCsvExportLoading(false);

      setTimeout(() => csvLink?.current?.link?.click(), 500);
    } catch (error) {
      setInventoryCsvExportLoading(false);
    }
  }

  const csvExportFileName = `${userInformation?.name}-${dayjs(new Date()).format(
    "YYYY-MM-DD__hh-mm-A"
  )}`;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations?.map((location) => (
                        <SelectItem key={location?.id} value={String(location?.id)}>
                          {location?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fullStock">Full Stock</SelectItem>
                      <SelectItem value="addStock">Add Stock</SelectItem>
                      <SelectItem value="subStock">Minus Stock</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <FileInput
            accept={{
              "text/csv": [],
            }}
            name="csvFiles"
          />

          <section className="flex justify-between">
            <section className="flex gap-2">
              <Button
                variant="secondary"
                type="button"
                className="bg-slate-100 text-slate-900"
                onClick={() => window.open("/files/stock-update-demo.csv")}
              >
                CSV Demo
              </Button>
              <Button
                variant="secondary"
                className="bg-slate-100 text-slate-900"
                onClick={csvExportHandler}
                type="button"
                disabled={inventoryCsvExportLoading}
              >
                {inventoryCsvExportLoading && (
                  <RotateCw className="mr-1 h-4 animate-spin" />
                )}
                CSV Export
              </Button>
            </section>
            <section className="space-x-2">
              {props?.dashboard && (
                <Button
                  type="button"
                  className="bg-newPrimary"
                  onClick={props?.handleContinue}
                >
                  Setup Later
                </Button>
              )}
              <Button
                loading={
                  updateIsLoading ||
                  addIsLoading ||
                  subtractIsLoading ||
                  returnedStockIsLoading
                }
                type="submit"
                className="w-32 bg-slate-900 text-white"
                disabled={
                  updateIsLoading ||
                  addIsLoading ||
                  subtractIsLoading ||
                  returnedStockIsLoading
                }
              >
                {props.dashboard ? "Continue" : "Import"}
              </Button>
            </section>
          </section>
        </form>
      </Form>

      <CSVLink data={csvData} filename={csvExportFileName} ref={csvLink} />
    </>
  );
}
