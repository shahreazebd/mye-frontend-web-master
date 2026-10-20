"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stringToBase64 } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { Eye, EyeOff } from "lucide-react";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import useLogin from "@/hooks/queries/auth/useLogin";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter a valid email."),
  password: z
    .string({ required_error: "Password is required." })
    .nonempty({ message: "Password field can not be empty" }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = React.useState(false);
  const [token, setToken] = React.useState("");

  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isLoading } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const onVerify = React.useCallback((token: string) => {
    setToken(token);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    const payload = { email, password: stringToBase64(password) };

    mutate(payload, {
      onSuccess: (data) => {
        toast({
          title: "Logged In",
          description: "You have successfully logged in!",
        });

        setRefreshReCaptcha((r) => !r);
        setCookie("accessToken", data?.data?.data?.access_token);
        setCookie("refreshToken", data?.data?.data?.refresh_token);
        setCookie("userType", data?.data?.data?.type);
        localStorage.removeItem("registerEmail");
        localStorage.removeItem("forgotPasswordEmail");
      },
      onError: (error) => {
        if ((error as any).response?.status === 302) {
          toast({
            title: "Login code sent",
            description: "Please check you email!",
          });
          router.push(`/verify-identity?email=${values?.email}`);
        } else if (error) {
          if ((error as any).response.data.message === "User is not verified") {
            toast({
              title: "Verification code sent",
              description: "Please check you email!",
            });
            router.push(`/verification?email=${values.email}&type=login`);
          }
        }
      },
    });
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdGt38jAAAAAFZI4UlE5C_SJn5sGZBJ2MGsNz_x">
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="password"
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

            <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha} />

            <section className="flex justify-end">
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div> */}

              <Link
                href="/forgot-password"
                className={cn(buttonVariants({ variant: "link" }), "p-0")}
              >
                Forgot Password?
              </Link>
            </section>

            <Button
              disabled={isLoading || !form.formState.isValid || !token}
              loading={isLoading}
              type="submit"
              size="sm"
            >
              Sign In
            </Button>

            {/* <Button disabled={!form.formState.isValid} type="submit" size="sm">
            Sign In
          </Button> */}
          </form>
        </Form>
      </div>
    </GoogleReCaptchaProvider>
  );
}
