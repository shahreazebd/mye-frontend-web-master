"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useChangePassword from "@/hooks/queries/auth/useChangePassword";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  old_password: z.string({ required_error: "Password is required." }),
  credential: z
    .object({
      new_password: z
        .string({ required_error: "Password is required." })
        .refine(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/.test(value),
          "Password must be hold at least 12 characters, 1 uppercase, 1 lowercase , 1 special character and 1 number"
        ),
      confirm_password: z.string({ required_error: "Confirm password required." }),
    })
    .refine(
      ({ confirm_password, new_password }) => {
        return new_password === confirm_password;
      },
      {
        message: "Password & Confirm Password do not match.",
        path: ["confirm_password"],
      }
    ),
});

type Props = {
  className?: string;
};

export function ChangePasswordForm({ className }: Props) {
  const { userInformation } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      old_password: "",
      credential: {
        new_password: "",
        confirm_password: "",
      },
    },
  });

  const { mutate: changePassword, isLoading } = useChangePassword();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      email: userInformation?.user_email,
      old_password: values.old_password,
      new_password: values.credential.new_password,
      confirm_password: values.credential.confirm_password,
    };

    changePassword(payload, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="************" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="credential.new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="************" {...field} />
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
                  <PasswordInput placeholder="************" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading || !form.formState.isValid}
            loading={isLoading}
            type="submit"
            size="sm"
          >
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
