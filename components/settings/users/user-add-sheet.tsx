"use client";

import { useState } from "react";
import usersAtom from "@/atoms/usersAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { object, z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useAddActivityLog from "@/hooks/queries/activity-log/useAddActivityLog";
import useGetFeatures from "@/hooks/queries/identification/features/useGetFeatures";
import useAddChildUser from "@/hooks/queries/user/useAddChildUser";
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
import { MultiSelect } from "@/components/core/multi-select";
import CountrySelect from "@/components/shared/country-select";

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
        .refine(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/.test(value),
          "Password must be hold at least 12 characters, 1 uppercase, 1 lowercase , 1 special character and 1 number"
        ),
      confirm_password: z.string({ required_error: "Confirm password required." }),
    })
    .refine(
      ({ confirm_password, password }) => {
        return password === confirm_password;
      },
      {
        message: "Password & Confirm Password do not match.",
        path: ["confirm_password"],
      }
    ),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  phone: z
    .string({ required_error: "Phone number is required." })
    .max(20, { message: "Phone number must contain at most 20 character(s)" })
    .regex(phoneRegex, "Please enter a valid phone number!"),
  address: z
    .string({ required_error: "Company address is required." })
    .nonempty({ message: "Company address must contain at least 1 character(s)" })
    .max(200, { message: "Company address must contain at most 100 character(s)" }),
  country: z.string({ required_error: "Country is required." }),
  post_code: z
    .string({ required_error: "Postcode is required." })
    .nonempty({ message: "Postcode must contain at least 1 character(s)" })
    .max(10, { message: "Postcode must contain at most 10 character(s)" }),
});

export let modifiedFeatures: any;

export default function UsersAddSheet() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [user, setUser] = useAtom(usersAtom);
  const { userInformation } = useAuth();
  const { mutate: addActivityLog } = useAddActivityLog();

  const { data: allFeatures } = useGetFeatures();
  const { mutate: addChildUser, isLoading } = useAddChildUser();

  modifiedFeatures = allFeatures?.data?.data.map((feature: any) => {
    return {
      label: feature.name,
      value: feature.id,
    };
  });
  // .concat([{ label: "Inventory", value: "" }]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      company_uid: userInformation?.company_uid,
      service_name: "mye",
      password: values.credential.password,
      confirm_password: values.credential.confirm_password,
    };

    const fullName = `${values.firstname} ${values.lastname}`;

    addChildUser(payload, {
      onSuccess: () => {
        setUser((prev) => ({
          ...prev,
          isUserAddSheetOpen: false,
        }));

        const payload = {
          website_name: "mye",
          company_uid: userInformation?.company_uid,
          notification_data: {
            data: `joined MYE.`,
            user: fullName,
            type: "child-user",
            parent_type: "user",
            avatar_url: userInformation?.avater_url,
          },
        };

        addActivityLog(payload, {
          onSuccess: () => {
            form.reset({
              firstname: "",
              lastname: "",
              email: "",
              credential: {
                password: "",
                confirm_password: "",
              },
              post_code: "",
              address: "",
              country: "",
              phone: "",
            });
            sheetClose();
          },
        });
      },
    });
  }

  const sheetClose = () => {
    setUser((prev) => ({
      ...prev,
      isUserAddSheetOpen: false,
    }));
  };

  return (
    <>
      <Sheet open={user.isUserAddSheetOpen} onOpenChange={sheetClose}>
        <SheetContent className="w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create New User</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name*</FormLabel>
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
                    <FormLabel>Last Name*</FormLabel>
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
                    <FormLabel>Email*</FormLabel>
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
                    <FormLabel>Password*</FormLabel>
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
                    <FormLabel>Confirm Password*</FormLabel>
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
                    <FormLabel>Post Code*</FormLabel>
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
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
                    <FormLabel>Country*</FormLabel>
                    <FormControl>
                      <CountrySelect className="w-[350px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone*</FormLabel>
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
                    <FormLabel>Permission*</FormLabel>
                    <FormControl>
                      <MultiSelect
                        data={modifiedFeatures}
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
                  loading={isLoading}
                  disabled={isLoading || !form.formState.isValid}
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
