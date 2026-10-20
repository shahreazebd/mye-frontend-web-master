"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { User } from "@/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { object, z } from "zod";

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
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MultiSelect } from "@/components/core/multi-select";

import { modifiedFeatures } from "./user-add-sheet";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  data: User;
};

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const formSchema = object({
  firstname: z
    .string({ required_error: "First Name is required." })
    .nonempty({ message: "First Name must contain at least 1 character(s)" })
    .max(100, { message: "First Name must contain at most 100 character(s)" }),
  lastname: z
    .string({ required_error: "Last Name is required." })
    .nonempty({ message: "Last Name must contain at least 1 character(s)" })
    .max(100, { message: "Last Name must contain at most 100 character(s)" }),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter a valid email."),
  credential: z
    .object({
      password: z
        .string({ required_error: "Password is required." })
        .refine((value) => {
          if (value === "") {
            return true;
          } else {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/.test(
              value
            );
          }
        }, "Password must be hold at least 12 characters, 1 uppercase, 1 lowercase , 1 special character and 1 number")
        .optional(),
      confirm_password: z
        .string({ required_error: "Confirm password required." })
        .optional(),
    })
    .refine(
      ({ confirm_password, password }) => {
        return password === confirm_password;
      },
      {
        message: "Password & Confirm Password do not match.",
        path: ["confirm_password"],
      }
    )
    .optional(),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  phone: z
    .string({ required_error: "Phone number is required." })
    .max(20, { message: "Phone number must contain at most 20 character(s)" })
    .regex(phoneRegex, "Invalid Number!"),
  address: z
    .string({ required_error: "Company address is required." })
    .nonempty({ message: "Company address must contain at least 1 character(s)" })
    .max(200, { message: "Company address must contain at most 100 character(s)" }),
  post_code: z
    .string({ required_error: "Postcode is required." })
    .nonempty({ message: "Postcode must contain at least 1 character(s)" })
    .max(10, { message: "Postcode must contain at most 10 character(s)" }),
});

export default function UsersEditSheet({ isOpen, setIsOpen, data }: Props) {
  const [features, setFeatures] = useState<any>([]);
  const { toast } = useToast();
  // const { mutate, isLoading } = useLogin();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  useEffect(() => {
    if (data) {
      setFeatures(() =>
        data.features.map((feature: any) => {
          return {
            label: feature.name,
            value: feature.id,
          };
        })
      );
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",

    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      credential: {
        password: "",
        confirm_password: "",
      },
      address: data.address,
      phone: data.phone,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      features: values.features.map((feature) => {
        return {
          id: feature,
        };
      }),

      ...(values?.credential?.password && {
        password: values.credential.password,
        confirm_password: values.credential.confirm_password,
      }),
    };

    delete payload.credential;

    toast({
      title: "This is under development",
      description: "This feature is under development",
    });

    // console.log(payload);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent className="w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Update User</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
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
                name="credential.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordShow ? "text" : "password"}
                          {...field}
                          className="pr-12"
                        />
                        <span className="absolute inset-y-0 right-3 inline-flex items-center">
                          {passwordShow ? (
                            <Eye
                              className="size-4 cursor-pointer text-gray-400"
                              onClick={() => setPasswordShow((prev) => !prev)}
                            />
                          ) : (
                            <EyeOff
                              className="size-4 cursor-pointer text-gray-900 hover:text-gray-500"
                              onClick={() => setPasswordShow((prev) => !prev)}
                            />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="credential.confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={confirmPasswordShow ? "text" : "password"}
                          {...field}
                          className="pr-12"
                        />
                        <span className="absolute inset-y-0 right-3 inline-flex items-center">
                          {confirmPasswordShow ? (
                            <Eye
                              className="size-4 cursor-pointer text-gray-400"
                              onClick={() => setConfirmPasswordShow((prev) => !prev)}
                            />
                          ) : (
                            <EyeOff
                              className="size-4 cursor-pointer text-gray-900 hover:text-gray-500"
                              onClick={() => setConfirmPasswordShow((prev) => !prev)}
                            />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="post_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <CountrySelect defaultValue={""} className="w-[350px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permission</FormLabel>
                    <FormControl>
                      <MultiSelect
                        data={modifiedFeatures}
                        defaultValue={features}
                        onChange={(values) => {
                          field.onChange(values.map(({ value }) => value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button
                  // loading={isLoading}
                  className="w-[140px]"
                  type="submit"
                >
                  Submit
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
