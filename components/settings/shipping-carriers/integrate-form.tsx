import { useEffect } from "react";
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

import { Carrier, packageTypes, pickupTypes, serviceTypes } from "./data";

const formSchema = z.object({
  client_id: z.string().min(1).optional(),
  client_secret: z.string().min(1).optional(),
  name: z.string().min(1),
  email: z.string().min(1).optional(),
  auth_token: z.string().min(1).optional(),
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

interface Props {
  prevStep: () => void;
  carrier: Carrier;
  defaultValue?: any;
}

export function IntegrateForm({ prevStep, carrier, defaultValue }: Props) {
  const { userInformation } = useAuth();

  const { mutate: integrateCarrier } = useIntegrateCarrier();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  useEffect(() => {
    if (form) {
      form.reset();
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    let payload: any = {
      company_uid: userInformation?.company_uid,
      shipping_service_name: carrier.name,
    };

    if (carrier.name === "FEDEX") {
      payload = {
        ...payload,
        credential_type: "TOKEN",
        name: values.name,
        client_id: values.client_id,
        client_secret: values.client_secret,
        carrier_meta_data: {
          ship_from: {
            streetLines: values?.carrier_meta_data?.ship_from?.streetLines,
            city: values?.carrier_meta_data?.ship_from?.city,
            stateOrProvinceCode:
              values?.carrier_meta_data?.ship_from?.stateOrProvinceCode,
            postalCode: values?.carrier_meta_data?.ship_from?.postalCode,
            countryCode: values?.carrier_meta_data?.ship_from?.countryCode,
          },
          additional_data: {
            service_type: values?.carrier_meta_data?.additional_data?.service_type,
            package_type: values?.carrier_meta_data?.additional_data?.package_type,
            pickup_type: values?.carrier_meta_data?.additional_data?.pickup_type,
          },
        },
      };

      integrateCarrier(payload);
    } else if (carrier.name === "Click and drop") {
      payload = {
        ...payload,
        name: values.name,
        email: values.email,
        shipping_service_name: "CLICKANDDROP",
        auth_token: values?.auth_token,
        credential_type: "TOKEN",
      };

      integrateCarrier(payload, {
        onSuccess: () => {
          form.reset();
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-1 space-y-4">
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

        {carrier.name === "Click and drop" && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="auth_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auth Token</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {carrier.name === "FEDEX" && (
          <>
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
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
                  <FormLabel>Client Secret</FormLabel>
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

            <h6>Additional Requirements</h6>

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
          </>
        )}

        {!defaultValue?.uuid && (
          <Button type="button" variant="outline" onClick={prevStep} size="sm">
            Back
          </Button>
        )}

        <Button type="submit" variant="default" className="ml-2" size="sm">
          Submit
        </Button>
      </form>
    </Form>
  );
}
