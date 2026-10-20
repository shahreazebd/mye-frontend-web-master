"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useFedexIntegrate } from "@/hooks/queries/new-carriers/use-fedex-integrate";
// import { useGetStores } from "@/hooks/queries/store/useGetStores";
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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  accountNumber: z.string().min(1, "Account number is required").optional(),
  shipperName: z.string().min(1).max(50),
  shipperPhone: z.string().optional(),
  shipperEmail: z.string().email().optional(),
  countryCode: z.string().max(2),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().max(20),
  stateOrProvinceCode: z.string().min(1, "State/Province is required"),
  addressLine1: z.string().min(1).max(60),
  addressLine2: z.string().min(1).max(60).optional(),
  credentials: z.object({
    refreshToken: z.string().min(1, "Amazon store or token is required"),
  }),
  metadata: z.object({
    storeId: z.string().min(1),
  }),
});

type FedexShippingFormValues = z.infer<typeof formSchema>;

export function AmazonShippingForm() {
  const { mutate: triggerIntegrateFedex, isLoading } = useFedexIntegrate();

  const form = useForm<FedexShippingFormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FedexShippingFormValues) {
    const payload = {
      ...values,
      type: "AMAZON",
      credentialType: "BEARER",
    };

    triggerIntegrateFedex(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
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
          name="credentials.refreshToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amazon Store Refresh Token*</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Refresh Token" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* )} */}
        <FormField
          control={form.control}
          name="shipperName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipper Name*</FormLabel>
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
              <FormLabel>Account number</FormLabel>
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
              <FormLabel>Shipper Phone</FormLabel>
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
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Code*</FormLabel>
              <FormControl>
                <Input {...field} maxLength={2} placeholder="US" />
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
              <FormLabel>City*</FormLabel>
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
              <FormLabel>Postal Code*</FormLabel>
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
              <FormLabel>State/Province*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metadata.storeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Id*</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-end">
          <Button disabled={isLoading} loading={isLoading} type="submit">
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
