"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import useRegister from "@/hooks/queries/auth/useRegister";
import { Form } from "@/components/ui/form";

import { Button } from "../ui/button";
import MultiStepProgressBar from "./multi-step-progress-bar";
import Step1 from "./step1";
import Step2 from "./step2";

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const formSchema = z.object({
  firstname: z
    .string({ required_error: "First name is required." })
    .nonempty({ message: "First name must contain at least 1 character(s)" })
    .max(100, { message: "First name must contain at most 100 character(s)" }),
  lastname: z
    .string({ required_error: "Last name is required." })
    .nonempty({ message: "Last name must contain at least 1 character(s)" }),

  credential: z
    .object({
      email: z
        .string({ required_error: "Email is required." })
        .email("Please enter a valid email."),

      password: z
        .string({ required_error: "Password is required." })
        .refine(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/.test(value),
          "Password must be hold at least 12 characters, 1 uppercase, 1 lowercase , 1 special character and 1 number"
        ),
      confirm_password: z.string({ required_error: "Confirm password required." }),
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password and Confirm Password do not match.",
          path: ["confirm_password"],
        });
      }

      const localPart = val.email.split("@")[0];

      if (val.password.includes(localPart)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password cannot contain part of your email",
          path: ["password"],
        });
      }
    }),
  phone: z
    .string({ required_error: "Phone number is required." })
    .max(20, { message: "Phone number must contain at most 20 character(s)" })
    .regex(phoneRegex, "Invalid Number!"),

  company_name: z
    .string({ required_error: "Company name is required." })
    .min(1, { message: "Company name must contain at least 1 character(s)" })
    .max(100, { message: "Company name must contain at most 100 character(s)" }),
  company_address: z
    .string({ required_error: "Company address is required." })
    .min(1, { message: "Company address must contain at least 1 character(s)" })
    .max(200, { message: "Company address must contain at most 100 character(s)" }),
  country: z.string({ required_error: "Country is required." }),
  post_code: z
    .string({ required_error: "Postcode is required." })
    .min(1, { message: "Postcode must contain at least 1 character(s)" })
    .max(10, { message: "Postcode must contain at most 10 character(s)" }),
});

export type RegistrationFormValues = z.infer<typeof formSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate, isLoading } = useRegister();
  const router = useRouter();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  // const state = form.formState.isDirty && Object.entries(form.formState.errors).length;

  function onSubmit(values: RegistrationFormValues) {
    const payload = {
      ...values,
      user_type: "parent",
      service_name: "mye",
      email: values.credential.email?.trim(),
      address: values.company_address?.trim(),
      password: values.credential.password,
      confirm_password: values.credential.confirm_password,
    };

    // eslint-disable-next-line no-unused-vars
    const { credential, ...rest } = payload;

    mutate(rest, {
      onSuccess: () => {
        setTimeout(() => {
          router.push(`/verification?email=${values.credential.email}&type=register`);
        }, 1000);

        form.reset();
      },
    });
  }

  function next() {
    form
      .trigger([
        "firstname",
        "lastname",
        "credential.email",
        "credential.password",
        "credential.confirm_password",
      ])
      .then((e) => e && setCurrentStep((prev) => prev + 1));
  }

  function prev() {
    if (currentStep >= 1) {
      setCurrentStep(() => 1);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function previousButton() {
    if (currentStep !== 1) {
      return (
        <Button type="button" className="w-full" variant="outline" onClick={prev}>
          Previous
        </Button>
      );
    }

    return null;
  }

  function nextButton() {
    if (currentStep < 2) {
      return (
        <Button type="button" className="w-full" onClick={next}>
          Next
        </Button>
      );
    }
    return null;
  }

  function submitButton() {
    if (currentStep > 1) {
      return (
        <Button
          className="mb-3 w-full"
          type="submit"
          disabled={isLoading || !form.formState.isValid}
        >
          Register
        </Button>
      );
    }

    return null;
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <>
        <MultiStepProgressBar currentStep={currentStep} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Step1 currentStep={currentStep} />
            <Step2 currentStep={currentStep} />

            <div>
              {nextButton()}
              {submitButton()}
              {previousButton()}
            </div>
          </form>
        </Form>
      </>
    </div>
  );
}
