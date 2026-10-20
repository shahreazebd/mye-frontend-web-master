import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
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
  accountNumber: z.string().min(1),
  email: z.string().min(1).email(),
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  countryCode: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  streetLines: z.array(z.string().min(1)).min(1),
  stateOrProvinceCode: z.string().min(1),
  shipperName: z.string().min(1),
  shipperPhoneNumber: z.string().min(1),
  metadata: z.object({
    pickupType: z.string().min(1),
    serviceType: z.string().min(1),
    packagingType: z.string().min(1),
  }),
});

export function IntegrateForm({
  prevStep,
  carrier,
}: {
  prevStep: () => void;
  carrier: any;
}) {
  const { userInformation } = useAuth();

  // const { mutate: triggerCreateCarrier, isPending } = useCreateServices();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      accountNumber: "",
      email: "",
      clientId: "",
      clientSecret: "",
      countryCode: "",
      city: "",
      postalCode: "",
      streetLines: [],
      stateOrProvinceCode: "",
      shipperName: "",
      shipperPhoneNumber: "",
      metadata: {
        pickupType: "DROPOFF_AT_FEDEX_LOCATION",
        serviceType: "PRIORITY_OVERNIGHT",
        packagingType: "FEDEX_ENVELOPE",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      companyId: userInformation?.id,
      type: "FEDEX",
      isActive: true,
      isDefault: false,
    };

    // triggerCreateCarrier(payload, {
    //   onSuccess: () => {
    //     form.reset();
    //   },
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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
          name="shipperName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipper Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shipperPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipper Phone Number</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientId"
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
          name="clientSecret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Secret</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="countryCode"
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
              <FormLabel>State or Province Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Street Lines */}
        <FormField
          control={form.control}
          name="streetLines"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Lines</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((line: string, idx: number) => (
                    <Input
                      key={idx}
                      value={line}
                      onChange={(e) => {
                        const newLines = [...field.value];
                        newLines[idx] = e.target.value;
                        field.onChange(newLines);
                      }}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metadata.serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
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
          name="metadata.packagingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Packaging Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select packaging type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
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
          name="metadata.pickupType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup type" />
                  </SelectTrigger>
                  <SelectContent>
                    {pickupTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" variant="outline" onClick={prevStep} size="sm">
          Back
        </Button>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
