import { useEffect, useRef, useState } from "react";
import locationAtom from "@/atoms/locationAtom";
import type { CellContext } from "@tanstack/react-table";
import { useAtom } from "jotai";
import { Lock } from "lucide-react";

import type { Inventory } from "@/types/inventory";
import useAuth from "@/hooks/custom/useAuth";
import useUpdateSingleStock from "@/hooks/queries/inventory/use-update-single-stock";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "../ui/input";

export default function StockLevel(props: CellContext<Inventory, unknown>) {
  const initialValue = props?.getValue() as number;
  const { userInformation } = useAuth();
  const isComposite = props?.row?.original?.local_product?.is_composite;
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);

  const [location] = useAtom(locationAtom);

  const [open, setOpen] = useState(false);

  const { mutate: updateStockLevel } = useUpdateSingleStock(location?.locationId);

  localStorage.setItem("prevStockLevel", initialValue?.toString());

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isEditing]);

  function startEditing() {
    if (isComposite) {
      return;
    }

    if (
      ["owner", "parent"]?.includes(userInformation?.type!) ||
      userInformation?.user_email === "shobuj@roughandtough.co.uk"
    ) {
      setIsEditing(true);
    }
  }

  function onBlur() {
    const payload = {
      sku: props?.row?.original?.local_product?.sku,
      company_uid: props?.row?.original?.company_uid,
      product_quantity: value,
      location_id: +location?.locationId,
    };

    setIsEditing(false);

    const state = value - props?.row?.original?.in_open;

    if (state < 0) {
      setOpen(true);
      return;
    }

    updateStockLevel([payload], {
      onError: () => {
        setValue(initialValue);
      },
    });
  }

  //

  return (
    <>
      <div onDoubleClick={startEditing} className="w-24 text-center">
        {isEditing ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.valueAsNumber)}
            onBlur={onBlur}
            onKeyUp={(e) => {
              if (e.key === "Enter") onBlur();
            }}
            type="number"
            className="h-7 w-28"
            ref={inputRef}
          />
        ) : (
          <div className="flex items-center justify-center gap-1.5">
            <span>{value}</span>
            {isComposite && (
              <span title="Composite Product (Not editable manually)">
                <Lock
                  size={12}
                  className="shrink-0 cursor-help select-none text-gray-400"
                />
              </span>
            )}
          </div>
        )}
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid Stock Level</AlertDialogTitle>
            <AlertDialogDescription>
              The stock level you entered is below the required threshold. Ensure the
              value is at least equal to the items currently in open.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setValue(props?.row?.original?.stock_level);
              }}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="bg-[#ee1e5f]"
              onClick={() => {
                const payload = {
                  sku: props?.row?.original?.local_product?.sku,
                  company_uid: props?.row?.original?.company_uid,
                  product_quantity: value,
                  location_id: +location?.locationId,
                };

                updateStockLevel([payload], {
                  onError: () => {
                    setValue(initialValue);
                  },
                });
              }}
            >
              Update, Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
