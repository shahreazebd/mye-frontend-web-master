"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import useResetPassword from "@/hooks/queries/auth/useResetPassword";
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
  credential: z
    .object({
      password: z
        .string({ required_error: "Password is required." })
        .refine(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/.test(value),
          "Password must be hold at least 12 characters, 1 uppercase, 1 lowercase , 1 special character and 1 number"
        ),
      confirmPassword: z.string({ required_error: "Confirm password required." }),
    })
    .refine(
      ({ confirmPassword, password }) => {
        return password === confirmPassword;
      },
      {
        message: "Password & Confirm Password do not match.",
        path: ["confirmPassword"],
      }
    ),
});

export function ResetPasswordConfirm({ token }: { token: string }) {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const { mutate, isLoading } = useResetPassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      credential: {
        password: "",
        confirmPassword: "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      new_password: values.credential.password,
      confirm_password: values.credential.confirmPassword,
      token,
    };

    mutate(payload);
  }

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="credential.confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={confirmPasswordShow ? "text" : "password"}
                      placeholder="Pa$$w0rd!"
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
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
