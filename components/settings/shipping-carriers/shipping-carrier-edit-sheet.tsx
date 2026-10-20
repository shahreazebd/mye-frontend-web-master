import { useEffect } from "react";
import { useShippingCarrierAtom } from "@/atoms/shippingCarrierAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateCarrier } from "@/hooks/queries/carriers/use-update-carrier";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { packageTypes, pickupTypes, serviceTypes } from "./data";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),

  carrier_meta_data: z
    .object({
      ship_from: z.object({
        streetLines: z.string().optional(),
        city: z.string().optional(),
        stateOrProvinceCode: z.string().optional(),
        postalCode: z.string().optional(),
        countryCode: z.string().optional(),
      }),
      additional_data: z.object({
        service_type: z.string().min(1),
        package_type: z.string().min(1),
        pickup_type: z.string().min(1),
      }),
    })
    .optional(),
});

export function ShippingCarrierEditSheet() {
  const { carrier, handleCarrier } = useShippingCarrierAtom();
  const { mutate, isLoading } = useUpdateCarrier();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      name: values.name,
      uuid: carrier?.editCarrierData?.uuid,
      carrier_meta_data: {
        ship_from: {
          streetLines: values?.carrier_meta_data?.ship_from?.streetLines,
          city: values?.carrier_meta_data?.ship_from?.city,
          stateOrProvinceCode: values?.carrier_meta_data?.ship_from?.stateOrProvinceCode,
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

    mutate(payload, {
      onSuccess: () => {
        form.reset();
        handleCarrier({ isOpenEditSheet: false });
      },
    });
  }

  useEffect(() => {
    const defaultValues = {
      name: carrier.editCarrierData?.name || "",

      carrier_meta_data: {
        ship_from: {
          streetLines:
            carrier.editCarrierData?.carrier_meta_data?.ship_from?.streetLines || "",
          city: carrier.editCarrierData?.carrier_meta_data?.ship_from?.city || "",
          stateOrProvinceCode:
            carrier.editCarrierData?.carrier_meta_data?.ship_from?.stateOrProvinceCode ||
            "",
          postalCode:
            carrier.editCarrierData?.carrier_meta_data?.ship_from?.postalCode || "",
          countryCode:
            carrier.editCarrierData?.carrier_meta_data?.ship_from?.countryCode || "",
        },
        additional_data: {
          service_type:
            carrier.editCarrierData?.carrier_meta_data?.additional_data?.service_type ||
            "",
          package_type:
            carrier.editCarrierData?.carrier_meta_data?.additional_data?.package_type ||
            "",
          pickup_type:
            carrier.editCarrierData?.carrier_meta_data?.additional_data?.pickup_type ||
            "",
        },
      },
    };

    form.reset(defaultValues);
  }, [carrier.editCarrierData, form]);

  return (
    <Sheet
      open={carrier.isOpenEditSheet}
      onOpenChange={() => handleCarrier({ isOpenEditSheet: false })}
    >
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Carrier</SheetTitle>
          <SheetDescription>
            Make changes to your carrier here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="m-1 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
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
                    <Input {...field} value={field.value || ""} />
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
                    <Input {...field} value={field.value || ""} />
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
                    <Input {...field} value={field.value || ""} />
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
                    <Input {...field} value={field.value || ""} />
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
                    <Input {...field} value={field.value || ""} />
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
                    <Select value={field.value || ""} onValueChange={field.onChange}>
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
                    <Select value={field.value || ""} onValueChange={field.onChange}>
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
                    <Select value={field.value || ""} onValueChange={field.onChange}>
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

            <Button
              type="submit"
              variant="default"
              disabled={isLoading}
              className="ml-2"
              size="sm"
            >
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
