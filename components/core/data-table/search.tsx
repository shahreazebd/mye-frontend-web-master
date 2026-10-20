import React from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";

export type TSearch = {
  value: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export default function SearchInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: TSearch) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="mr-4 flex items-center">
      <Input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className={`relative h-8 w-[300px] pr-8`}
      />

      {value ? (
        <X
          onClick={() => {
            setValue("");
          }}
          className="z-20 -ml-6 size-4 cursor-pointer"
        />
      ) : (
        <span className="-ml-6 size-4"></span>
      )}
    </div>
  );
}
