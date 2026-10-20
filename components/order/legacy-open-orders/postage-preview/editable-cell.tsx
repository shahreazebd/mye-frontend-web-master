import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { MappedOpenOrder } from "@/schema/open-order";
import type { CellContext } from "@tanstack/react-table";

import postcodeValidator from "@/lib/postcode-validator";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function EditableCell(
  props: Readonly<CellContext<MappedOpenOrder, unknown>>
) {
  const initialValue = props?.getValue() as string;
  const [toggle, setToggle] = useState(true);
  // const searchParams = Object.fromEntries(.entries());

  const searchParams = useSearchParams();
  const carrier = searchParams.get("carrier") || "evri";
  const country = searchParams.get("country") || "united kingdom";

  const [postcodeStatusClassName, setPostcodeStatusClassName] = useState("");

  const [value, setValue] = useState(initialValue);

  const inputRef = useRef<HTMLInputElement>(null);

  function onBlur() {
    setToggle(true);
    // @ts-ignore
    props?.table?.options?.meta?.updateData(props?.row?.index, props?.column?.id, value);
  }

  function toggleInput() {
    setToggle(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(() => event.target.value);
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [toggle]);

  // useEffect(() => {
  //   if (postageInfo?.isPostageReviewEditInputShown) {
  //     toggleInput();
  //   } else {
  //     onBlur();
  //   }
  // }, [postageInfo?.isPostageReviewEditInputShown]);

  useEffect(() => {
    if (
      props?.column?.id === "shipping_address.post_code" &&
      country === "united kingdom"
    ) {
      postcodeValidator(value).then((res) => {
        const postcodeClassName = !res?.success ? "text-red-700 font-semibold" : "";
        setPostcodeStatusClassName(postcodeClassName);
      });
    }
  }, [value]);

  let renderValue;

  if (props?.column?.id === "modified_sku") {
    const statusClassName =
      props?.row?.original?.total_items > 3 && carrier === "evri"
        ? "text-red-700 font-semibold"
        : "";

    renderValue = (
      <>
        {value?.split(",")?.map((sku, i) => (
          <Fragment key={i}>
            <span className={statusClassName}>{sku}</span>
            <br />
          </Fragment>
        ))}
      </>
    );
  } else if (props?.column?.id === "quantity") {
    const statusClassName =
      props?.row?.original?.total_items > 3 && carrier === "evri"
        ? "text-red-700 font-semibold"
        : "";

    renderValue = (
      <>
        {value?.split(",")?.map((sku, i) => (
          <Fragment key={i}>
            <span className={statusClassName}>{sku}</span>
            <br />
          </Fragment>
        ))}
      </>
    );
  } else if (props?.column?.id === "shipping_address.buyer_name") {
    const statusClassName =
      value?.trim() === "Pitney Bowes Warehouse" ? "text-red-700 font-semibold" : "";

    renderValue = <span className={statusClassName}>{value}</span>;
  } else if (props?.column?.id === "total_weight") {
    const statusClassName = +value >= 2000 ? "text-red-700 font-semibold" : "";

    renderValue = <span className={statusClassName}>{value}</span>;
  } else {
    renderValue = <>{value}</>;
  }

  if (
    country === "germany" &&
    !["DE", "DEU"]?.includes(value) &&
    props?.column?.id === "shipping_address.country"
  ) {
    renderValue = <span className="font-medium text-red-700">{value}</span>;
  }

  if (
    country === "united kingdom" &&
    !["GB"]?.includes(value) &&
    props?.column?.id === "shipping_address.country"
  ) {
    renderValue = <span className="font-medium text-red-700">{value}</span>;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        const blockList = ["shipping_address.country"];
        if (!blockList?.includes(props?.column?.id)) toggleInput();
      }}
      className="w-min-[100px] w-full"
    >
      {toggle ? (
        <div
          className={cn(
            value
              ? postcodeStatusClassName
              : "h-6  w-[100px] rounded border border-gray-400 p-1"
          )}
        >
          {renderValue}
        </div>
      ) : (
        <Input
          className="h-7 w-full"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onKeyUp={(e) => {
            if (e.key === "Enter") onBlur();
          }}
          // placeholder={""}
          type={props.column.columnDef.meta?.type || "text"}
          ref={inputRef}
        />
      )}
    </div>
  );
}
