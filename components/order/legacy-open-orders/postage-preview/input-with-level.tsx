import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
}

export function InputWithLevel(props: Props) {
  const { label, type = "number", placeholder = "0", className, ...rest } = props;

  return (
    <div
      className={cn(
        "my-1 grid min-w-14 max-w-[90px] grid-cols-3 overflow-hidden rounded-sm border border-gray-400",
        className
      )}
    >
      <input
        className="col-span-2 py-1 pl-2 pr-1 outline-none"
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      <p className="flex w-full items-center justify-center border-l border-gray-400 bg-gray-200 text-xs">
        {label}
      </p>
    </div>
  );
}
