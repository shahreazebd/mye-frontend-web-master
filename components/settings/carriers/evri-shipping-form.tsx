"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAddCarrier } from "@/hooks/queries/new-carriers/use-add-carrier";
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

import { Textarea } from "../../ui/textarea";

// {
//   "name": "test integrate old mye",
//   "type": "EVRI",
//   "shipperPhone": "07415070411",
//   "credentialType": "BEARER",
//   "credentials": {
//     "clientId": "zyhpM8LlVFy3UmnVCPxy6WVUTcsTZVx0",
//     "clientSecret": "YepGfkMBxe5QKGnb0EupZAP58F2eq3bax_U0DR_4XGeiRY8nICDVR2amYb0eotwv"
//   }
// }

const formSchema = z.object({
  name: z.string().min(1),
  // credentials: z.object({
  //   clientId: z.string().min(1, "Client ID is required"),
  //   clientSecret: z.string().min(1, "Client Secret is required"),
  // }),
  shipperPhone: z.string().max(25),

  // optional
  // accountNumber: z.string().min(1).optional(),
  shipperName: z.string().max(200).optional(),
  shipperEmail: z.string().email().max(254).optional(),
  countryCode: z.string().length(2).optional(),
  city: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  stateOrProvinceCode: z.string().min(1).optional(),
  addressLine1: z.string().min(1).max(256).optional(),
  addressLine2: z.string().min(1).max(256).optional(),

  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
});

type FedexShippingFormValues = z.infer<typeof formSchema>;

export function EvriShippingForm() {
  const { mutate: triggerAddCarrier, isLoading } = useAddCarrier();

  const form = useForm<FedexShippingFormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { ...rest } = values;

    const payload = {
      ...rest,
      credentials: {
        // ...credentials,
      },
      type: "EVRI",
      credentialType: "BEARER",
    };

    triggerAddCarrier(payload);
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

        {/* <FormField
          control={form.control}
          name="credentials.clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client ID*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="credentials.clientSecret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Secret*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Code</FormLabel>
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
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
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
