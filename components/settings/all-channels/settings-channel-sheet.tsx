"use client";

import Image from "next/image";
import { channelAtom } from "@/atoms/channelAtom";
import { carriers } from "@/constants/carriers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { object, string, z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useUpdateChannel from "@/hooks/queries/channel/useUpdateChannel";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const formSchema = object({
  name: string({ required_error: "Name is required" })
    .nonempty({ message: "Name must contain at least 1 character(s)" })
    .max(100, { message: "Name must contain at most 100 character(s)" }),
  channel_max_stock: z
    .string({ required_error: "Max stock is required" })
    .max(4, { message: "Max stock must contain at most 4 digits" })
    .regex(/^\d+$/, { message: "Invalid number!" })
    .transform((val) => Number(val)),
  max_pending_order_days: z.coerce
    .number({
      required_error: "Pending order retention is required",
      invalid_type_error: "Must be a valid number",
    })
    .int("Provide an integer")
    .nonnegative("Please enter a positive number")
    .max(999, { message: "Must not exceed 999 digits" }),
  location_id: string({ required_error: "Location is required" }).min(1),
  report_sorted_by: string().optional(),
  default_carrier: string().optional(),
});

export default function SettingsSheet() {
  const { userInformation } = useAuth();
  const { data: locations } = useGetLocations();
  const [channel, setChannel] = useAtom(channelAtom);
  const { mutate: updateChannel, isLoading } = useUpdateChannel();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: channel?.channelDetails?.name,
      channel_max_stock: String(channel?.channelDetails?.channel_max_stock) as any,
      report_sorted_by: channel?.channelDetails?.report_sorted_by || "",
      location_id: channel?.channelDetails?.channel_inventory_location?.toString(),
      max_pending_order_days: channel.channelDetails?.max_pending_order_days || 0,
    },
  });

  const sheetClose = () => {
    setChannel((prev) => ({
      ...prev,
      isChannelSheetOpen: false,
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      data: {
        ...values,
        report_sorted_by:
          values.report_sorted_by === "none" ? "" : values.report_sorted_by,
        channel_max_stock: +values.channel_max_stock,
        channel_type: channel?.channelDetails?.channel_type,
        channel_state: channel?.channelDetails?.channel_state,
        country: userInformation?.country as string,
        default_carrier: values.default_carrier?.toUpperCase(),
      },
      uuid: channel?.channelDetails?.channel_uid,
      company_uid: channel?.channelDetails?.company_uid as string,
    };

    updateChannel(payload, {
      onSuccess: (data) => {
        setChannel((prev) => ({
          ...prev,
          channelDetails: data.data,
        }));
        sheetClose();
      },
    });
  }

  return (
    <Sheet open={channel.isChannelSheetOpen} onOpenChange={sheetClose}>
      <SheetContent className="w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Import</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Channel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="channel_max_stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel max stock</FormLabel>
                    <FormControl>
                      <Input placeholder="20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max_pending_order_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keep Pending Orders For (Days)</FormLabel>
                    <FormControl>
                      <Input placeholder="20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="report_sorted_by"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Report Sorted By</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No Sort</SelectItem>
                          <SelectItem value="sku">SKU</SelectItem>
                          <SelectItem value="buyer">Buyer Name</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="location_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations?.map((location) => (
                          <SelectItem
                            key={location?.id?.toString()}
                            value={location?.id?.toString()}
                          >
                            {location?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {channel?.channelDetails?.channel_type === "amazon" && (
                <>
                  <p className="text-lg font-semibold text-foreground">
                    Additional Requirement
                  </p>
                  <FormField
                    control={form.control}
                    name="default_carrier"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Default Carrier</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a carrier" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {carriers
                                ?.filter((carrier) => carrier?.id !== "amazon")
                                ?.map((carrier) => (
                                  <SelectItem key={carrier?.id} value={carrier?.id}>
                                    <div className="flex items-center gap-x-2">
                                      <Image
                                        src={`/logos/carriers/round/${carrier?.id}.svg`}
                                        width={20}
                                        height={20}
                                        alt={carrier?.label}
                                      />
                                      {carrier?.label}
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </>
              )}

              <Button
                type="submit"
                variant="default"
                className="ml-2 w-full"
                disabled={isLoading}
              >
                Submit
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
