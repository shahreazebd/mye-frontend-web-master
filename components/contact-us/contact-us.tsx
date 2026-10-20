"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useContact from "@/hooks/queries/contact/useContact";
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
import { Textarea } from "@/components/ui/textarea";

import SectionHeader from "../shared/section-header";

const formSchema = z.object({
  first_name: z
    .string({ required_error: "First Name is required" })
    .nonempty({ message: "First Name must contain at least 1 character(s)" })
    .max(100, { message: "First Name must contain at most 100 character(s)" }),
  last_name: z
    .string({ required_error: "Last Name is required" })
    .nonempty({ message: "Last Name must contain at least 1 character(s)" })
    .max(100, { message: "Last Name must contain at most 100 character(s)" }),
  email: z
    .string({ required_error: "Email is required" })
    .nonempty({ message: "Email must contain at least 1 character(s)" })
    .email({ message: "Email must be valid" }),
  message: z
    .string()
    .nonempty({ message: "Message can not be empty" })
    .max(160, { message: "Bio must not be longer than 160 characters" }),
});

export function ContactUs() {
  const { mutate, isLoading } = useContact();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="rounded-xl pt-5 shadow-md md:p-8">
          <SectionHeader title="Get In Touch" description="" />

          <div className="mt-4 grid grid-cols-1 items-center md:gap-24 lg:grid-cols-2">
            <div className="px-12 py-6 lg:py-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
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
                          <Input placeholder="doe@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write your quieres here..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isLoading || !form.formState.isValid}
                    loading={isLoading}
                    type="submit"
                  >
                    Send
                  </Button>
                </form>
              </Form>
            </div>
            <div className="px-12 py-6 lg:py-10">
              <p className="my-6 flex w-auto items-center gap-8 text-sm md:text-base">
                <MapPin size={18} /> 620 London Road, Grays, RM20 3HX.
              </p>
              <p className="my-6 flex w-auto items-center gap-8 text-sm md:text-base">
                <Phone size={18} /> 020-3771-1970
              </p>
              <p className="my-6 flex w-auto items-center gap-8 text-sm md:text-base">
                <Mail size={18} /> info@manageyourecommerce.com
              </p>
              <div className="mx-auto mb-6 mt-12 flex">
                <div className="mx-auto flex lg:mx-0 lg:justify-end">
                  <ul className="ml-4 flex justify-center space-x-8 lg:space-x-3">
                    <li>
                      <a
                        href="https://twitter.com/ManageCommerce"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Twitter />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/showcase/manage-your-ecommerce"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Linkedin />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/@manageyourecommerce6558"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Youtube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <iframe
                className="shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.024853579123!2d0.27888519999999994!3d51.4760581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8b0d4585a018b%3A0xbc1b3ae165b8e1d0!2s620%20London%20Rd%2C%20Grays%20RM20%203HX%2C%20UK!5e0!3m2!1sen!2sbd!4v1694066317885!5m2!1sen!2sbd"
                width="100%"
                height="200"
                style={{ border: 0, margin: "10px" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
