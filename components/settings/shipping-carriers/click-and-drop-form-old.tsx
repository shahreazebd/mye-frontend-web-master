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

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().max(254),
  auth_token: z.string().max(254),
});

type FedexShippingFormValues = z.infer<typeof formSchema>;

export function ClickAndDropFormOld({ prevStep }: { prevStep: () => void }) {
  const { userInformation } = useAuth();
  const { mutate: integrateCarrier, isLoading } = useIntegrateCarrier();

  const form = useForm<FedexShippingFormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let payload: any = {
      company_uid: userInformation?.company_uid,
      shipping_service_name: "CLICKANDDROP",
      credential_type: "TOKEN",
      ...values,
    };

    integrateCarrier(payload);
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
              <FormLabel>authorization Key*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={prevStep}>
            Back
          </Button>
          <Button disabled={isLoading} loading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
