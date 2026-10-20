"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useFedexIntegrate } from "@/hooks/queries/new-carriers/use-fedex-integrate";
import { useGetRoyalMailServices } from "@/hooks/queries/royal-mail/use-get-royalmail-services";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import { Textarea } from "../../ui/textarea";

const formSchema = z.object({
  name: z.string().min(1),
  accountNumber: z.string().min(1).optional(),
  shipperName: z.string().max(200).optional(),
  shipperPhone: z.string().max(25),
  shipperEmail: z.string().email().max(254).optional(),
  countryCode: z.string().length(2),
  city: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  stateOrProvinceCode: z.string().min(1).optional(),
  addressLine1: z.string().min(1).max(256),
  addressLine2: z.string().min(1).max(256).optional(),
  metadata: z.object({
    packageFormatIdentifier: z.string().min(1),
    postage_service_code: z.string().min(1),
  }),
  credentials: z.object({
    authKey: z.string().min(1, "Auth Key is required"),
  }),
  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
});

type FedexShippingFormValues = z.infer<typeof formSchema>;

const PARCEL_SIZES = [
  {
    name: "Letter",
    value: "Letter",
    icon: "letter",
    maxWeight: 100,
    cost: 0.75,
    currency: "£",
    unit: {
      weight: "g",
      volume: "cm",
    },
    volume: {
      height: 24,
      width: 16,
      depth: 0.5,
    },
  },
  {
    name: "Large Letter",
    value: "LargeLetter",
    icon: "large-letter",
    maxWeight: 750,
    cost: 1.05,
    currency: "£",
    unit: {
      weight: "g",
      volume: "cm",
    },
    volume: {
      height: 35.3,
      width: 25,
      depth: 2.5,
    },
  },
  {
    name: "Small Parcel",
    value: "SmallParcel",
    icon: "small-parcel",
    maxWeight: 2,
    cost: 2.99,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 45,
      width: 35,
      depth: 16,
    },
  },
  {
    name: "Medium Parcel",
    value: "MediumParcel",
    icon: "medium-parcel",
    maxWeight: 20,
    cost: 4.35,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 46,
      width: 46,
      depth: 61,
    },
  },
  {
    name: "Tube",
    value: "Tube",
    icon: "tube",
    maxWeight: 20,
    cost: 4.35,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 90,
    },
    meta: {
      line1: "Length + twice the diameter must be no more than 104cm",
    },
  },

  {
    name: "Large Parcel",
    value: "Parcel",
    icon: "large-parcel",
    maxWeight: 30,
    cost: 12.12,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 150,
    },
    meta: {
      line1: "Length + girth must be no more than 300cm",
      line2: "No one dimension can exceed 150cm",
    },
  },
];

export function ClickAndDropShippingForm() {
  const { data: royalMailServices } = useGetRoyalMailServices();
  const { mutate: triggerIntegrateFedex, isLoading } = useFedexIntegrate();

  const form = useForm<FedexShippingFormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { metadata, ...rest } = values;

    const selectedParcelObject = PARCEL_SIZES.find(
      (p) => p.value === metadata.packageFormatIdentifier
    );

    const payload = {
      ...rest,
      metadata: {
        ...metadata,
        packageFormatIdentifier: selectedParcelObject ?? metadata.packageFormatIdentifier,
      },
      type: "ROYAL_MAIL",
      credentialType: "BEARER",
    };

    triggerIntegrateFedex(payload);
  }
  const selectedParcelSize = form.watch("metadata.packageFormatIdentifier");

  const modifyRoyalMailData =
    royalMailServices?.services?.filter((service) =>
      service?.validPackagings?.some((pkg) => pkg?.name === selectedParcelSize)
    ) ?? [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shipperName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipper Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shipperPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipper Phone*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shipperEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipper Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credentials.authKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>authorization Key*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Code*</FormLabel>
              <FormControl>
                <Input maxLength={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stateOrProvinceCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Province</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metadata.packageFormatIdentifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parcel Size*</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PARCEL_SIZES.map((e) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metadata.postage_service_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Packaging Type*</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedParcelSize || modifyRoyalMailData.length === 0}
                >
                  <SelectTrigger className="w-full overflow-hidden">
                    <SelectValue placeholder="Select packaging type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px] overflow-y-auto">
                    {modifyRoyalMailData.map((e) => (
                      <SelectItem key={e?.serviceCode} value={e?.serviceCode}>
                        {e?.serviceName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Is Active</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Is Default</FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <Button disabled={isLoading} loading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
