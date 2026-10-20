"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import { useIntegrateCarrier } from "@/hooks/queries/carriers/use-integrate-carrier";
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

import { packageTypes, pickupTypes, serviceTypes } from "./data";

const formSchema = z.object({
  name: z.string().min(1),
  client_id: z.string().min(1),
  client_secret: z.string().min(1),

  carrier_meta_data: z
    .object({
      ship_from: z.object({
        streetLines: z.string().min(1),
        city: z.string().min(1),
        stateOrProvinceCode: z.string().min(1),
        postalCode: z.string().min(1),
        countryCode: z.string().min(1),
      }),
      additional_data: z.object({
        service_type: z.string().min(1),
        package_type: z.string().min(1),
        pickup_type: z.string().min(1),
      }),
    })
    .optional(),
});

type FedexShippingFormValues = z.infer<typeof formSchema>;

export function FedexShippingForm() {
  const { userInformation } = useAuth();
  const { mutate: integrateCarrier, isLoading } = useIntegrateCarrier();

  const form = useForm<FedexShippingFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      client_id: "",
      client_secret: "",
      carrier_meta_data: {
        ship_from: {
          streetLines: "",
          city: "",
          stateOrProvinceCode: "",
          postalCode: "",
          countryCode: "",
        },
        additional_data: {
          service_type: "",
          package_type: "",
          pickup_type: "",
        },
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      credential_type: "TOKEN",
      shipping_service_name: "FEDEX",
      company_uid: userInformation?.company_uid,
    };
    integrateCarrier(payload, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carrier_meta_data.ship_from.streetLines"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Line</FormLabel>
              <FormControl>
                <Input
                  // type="number"

                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carrier_meta_data.ship_from.city"
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
          name="carrier_meta_data.ship_from.stateOrProvinceCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State or Province Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carrier_meta_data.ship_from.postalCode"
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
          name="carrier_meta_data.ship_from.countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client ID*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client_secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Secret*</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h6 className="col-span-2">Additional Requirements</h6>
        <FormField
          control={form.control}
          name="carrier_meta_data.additional_data.service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((serviceType) => (
                      <SelectItem key={serviceType.value} value={serviceType.value}>
                        {serviceType.label}
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
          name="carrier_meta_data.additional_data.package_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((packageType) => (
                      <SelectItem key={packageType.value} value={packageType.value}>
                        {packageType.label}
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
          name="carrier_meta_data.additional_data.pickup_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup type" />
                  </SelectTrigger>
                  <SelectContent>
                    {pickupTypes.map((pickupType) => (
                      <SelectItem key={pickupType.value} value={pickupType.value}>
                        {pickupType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-end">
          <Button disabled={isLoading} loading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
