"use client";

import React from "react";
import countries from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useGetLocations from "@/hooks/queries/location/useGetLocations";
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

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  channelMaxStock: z.string({
    required_error: "Channel Max Stock is required",
  }),
  location: z.string({
    required_error: "Location is required",
  }),
});

function AddChannel({
  handleContinue,
  setIsNext,
}: {
  handleContinue: () => void;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: locations } = useGetLocations();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // eslint-disable-next-line no-unused-vars
  function onSubmit(values: z.infer<typeof formSchema>) {
    handleContinue();
  }
  return (
    <>
      <Button onClick={() => setIsNext(false)} variant="outline">
        <ArrowBigLeft /> back
      </Button>
      <div className="mx-auto lg:mt-4 lg:w-7/12 2xl:mt-8 2xl:w-5/12">
        <h6 className="mb-8 text-base font-medium">Add New Channel</h6>
        <p className="mb-5 text-sm text-[#64748B]">
          Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero
          et velit interdum, ac aliquet odio mattis.
        </p>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John.snow@Example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country, index) => {
                        return (
                          <SelectItem key={index} value={country}>
                            {country}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="channelMaxStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Max Stock</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {locations?.length && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sync Inventory From Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations?.map((location, index) => {
                          return (
                            <SelectItem key={index} value={String(location.id)}>
                              {location.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" variant="dark">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default AddChannel;
