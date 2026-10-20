"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
  /**
   * Optional heading. Options are rendered under it as a group, and options
   * without a group are rendered in an unlabelled group.
   */
  group?: string;
};

type OptionGroup = {
  label?: string;
  options: Option[];
};

type Props = {
  className?: string;
  placeholder?: string;
  label?: string;
  /** Helper text under the label. */
  hint?: string;
  options: Option[];
  onValueChange?: (value: string) => void;
  defaultOption?: string;
};

export default function SelectOption(props: Readonly<Props>) {
  const [value, setValue] = useState(props?.defaultOption);

  const triggerId = useId();

  // Collapse consecutive options that share a group into a single group.
  const groups = useMemo(
    () =>
      props?.options?.reduce<OptionGroup[]>((acc, option) => {
        const last = acc[acc.length - 1];

        if (last && last.label === option?.group) {
          last.options.push(option);
        } else {
          acc.push({ label: option?.group, options: [option] });
        }

        return acc;
      }, []),
    [props?.options]
  );

  function onChangeHandler(value: string) {
    setValue(value);
    props?.onValueChange?.(value);
  }

  useEffect(() => {
    setValue(props?.defaultOption);
  }, [props?.defaultOption]);

  return (
    <section>
      {props?.label && (
        <div className="mb-2 space-y-1">
          <Label htmlFor={triggerId} className="text-sm font-medium text-slate-700">
            {props?.label}
          </Label>
          {props?.hint && <p className="text-xs text-slate-500">{props.hint}</p>}
        </div>
      )}
      <Select onValueChange={onChangeHandler} value={value}>
        <SelectTrigger id={triggerId} className={props?.className}>
          <SelectValue placeholder={props?.placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="max-h-72">
            {groups?.map((group, groupIndex) => {
              const items = group?.options?.map((option) => (
                <SelectItem key={option?.value} value={option?.value}>
                  {option?.label}
                </SelectItem>
              ));

              if (!group?.label) {
                return items;
              }

              return (
                <SelectGroup key={`${group.label}-${groupIndex}`}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {items}
                </SelectGroup>
              );
            })}
          </ScrollArea>
        </SelectContent>
      </Select>
    </section>
  );
}
