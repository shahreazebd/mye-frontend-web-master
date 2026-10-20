"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useFedexIntegrate } from "@/hooks/queries/new-carriers/use-fedex-integrate";
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

const formSchema = z.object({
  name: z.string().min(1),
  accountNumber: z.string().min(1).optional(),
  shipperName: z.string().min(1).max(50),
  shipperPhone: z.string().min(1),
  shipperEmail: z.string().email().optional(),
  countryCode: z.string(),
  city: z.string().min(1).max(40),
  postalCode: z.string().min(1).optional(),
  stateOrProvinceCode: z.string().min(1).optional(),
  addressLine1: z.string().min(1).max(50),
  addressLine2: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  metadata: z.object({
    billingNumber: z
      .string()
      .min(11, "Billing number must be at least 11 characters")
      .max(14, "Billing number must be at most 14 characters"),
    returnBillingNumber: z
      .string()
      .min(11, "Billing number must be at least 11 characters")
      .max(14, "Billing number must be at most 14 characters"),
  }),
  credentials: z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  }),
});

type FedexShippingFormValues = z.infer<typeof formSchema>;

export function DhlShippingForm() {
  const { mutate: triggerIntegrateFedex, isLoading } = useFedexIntegrate();
  const form = useForm<FedexShippingFormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { ...rest } = values;

    const payload = {
      ...rest,
      type: "DHL",
      credentialType: "BEARER",
    };
    triggerIntegrateFedex(payload);
  }

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
          name="metadata.billingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Number*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metadata.returnBillingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Billing Number*</FormLabel>
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
          name="credentials.username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credentials.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
                <Input maxLength={3} {...field} />
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
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1*</FormLabel>
              <FormControl>
                <Input {...field} placeholder="CJDAS34535DCS" />
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
                <Input {...field} placeholder=" DSBHVBDSVDS" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-6">
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
