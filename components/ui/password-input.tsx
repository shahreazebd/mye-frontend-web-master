import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [passwordShow, setPasswordShow] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={passwordShow ? "text" : "password"}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
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
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
