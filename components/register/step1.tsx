import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  currentStep: number;
}

export default function Step1({ currentStep }: Props) {
  const form = useFormContext();

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  if (currentStep !== 1) {
    return null;
  }

  return (
    <>
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
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="credential.email"
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
    </>
  );
}
