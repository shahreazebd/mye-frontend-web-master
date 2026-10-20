"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import { useCreateChannel } from "@/hooks/queries/channel/use-create-channel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CountrySelect from "@/components/shared/country-select";

import { Channel } from "./channel-add-step-1";

const formSchema = z.object({
  client_id: z.string({ required_error: "Client id is required" }).min(2, {
    message: "Client id must be at least 2 characters.",
  }),
  client_secret: z.string({ required_error: "Client secret is required" }).min(2, {
    message: "Client secret must be at least 2 characters.",
  }),
  name: z.string({ required_error: "Name is required" }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  region: z.string({ required_error: "Country is required" }),
});

interface Props {
  step: number;
  channel: Channel;
  prevStep: () => void;
}

export function WalmartForm({ channel, prevStep, step }: Props) {
  const { userInformation } = useAuth();
  const { mutate: integrateWalmart, isLoading } = useCreateChannel();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      company_uuid: userInformation?.company_uid,
    };
    integrateWalmart(payload, {
      onSuccess: () => {
        form.reset();
      },
    });
  }
  const MotionDiv = motion.div as any;
  return (
    <MotionDiv
      className="absolute opacity-0"
      animate={{ x: step > 1 ? 0 : 1000, y: -440, opacity: step > 1 ? 1 : 0 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,

        x: { duration: 0.5 },
      }}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-semibold">{channel.name}</h1>
          <p className="mt-1 text-sm">{channel.description}</p>
        </div>

        <Image src={channel.logo} alt={channel.name} width={100} height={100} />
      </div>
      <ScrollArea className="mt-5 h-[340px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelect className="w-[350px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
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
                  <FormLabel>Client Id</FormLabel>
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

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={prevStep} size="sm">
                Back
              </Button>
              <Button
                type="submit"
                variant="default"
                className="ml-2"
                size="sm"
                disabled={isLoading}
                loading={isLoading}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </MotionDiv>
  );
}
