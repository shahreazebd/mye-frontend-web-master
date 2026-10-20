"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  name: z
    .string({ required_error: "Name is required" })
    .nonempty({ message: "Name must contain at least 1 character(s)" })
    .max(100, { message: "Name must contain at most 100 character(s)" }),
  token: z
    .string({ required_error: "Token is required" })
    .nonempty({ message: "Token must contain at least 1 character(s)" })
    .max(100, { message: "Token must contain at most 100 character(s)" }),
});

function AddCarrier({
  handleContinue,
  setIsNext,
}: {
  handleContinue: () => void;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [tokenShow, setTokenShow] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
    handleContinue();
  }
  return (
    <div>
      <Button onClick={() => setIsNext(false)} variant="outline">
        <ArrowBigLeft /> back
      </Button>
      <div className="mx-auto lg:mt-14 lg:w-7/12 xl:mt-16 2xl:mt-20 2xl:w-5/12">
        <h6 className="mb-8 text-base font-medium">Add New Carriers</h6>
        <p className="mb-5 text-sm text-[#64748B]">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero
          et velit interdum, ac aliquet odio mattis.
        </p>
        <Form {...form}>
          <form className="space-y-8 " onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="something@something.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={tokenShow ? "text" : "password"}
                        placeholder="******"
                        {...field}
                        className="pr-12"
                      />
                      <span className="absolute inset-y-0 right-3 inline-flex items-center">
                        {tokenShow ? (
                          <Eye
                            className="size-4 cursor-pointer text-gray-400"
                            onClick={() => setTokenShow((prev) => !prev)}
                          />
                        ) : (
                          <EyeOff
                            className="size-4 cursor-pointer text-gray-900 hover:text-gray-500"
                            onClick={() => setTokenShow((prev) => !prev)}
                          />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="dark">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddCarrier;
