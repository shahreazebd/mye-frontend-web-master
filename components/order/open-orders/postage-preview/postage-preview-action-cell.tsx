import {
  useOpenOrderAtomWithStorage,
  usePostagePreviewStorage,
} from "@/atoms/openOrderAtom";
import { usePostageAtom } from "@/atoms/postageAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { CellContext } from "@tanstack/react-table";
import { CircleAlert, Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function PostagePreviewActionCell(props: CellContext<MappedOpenOrder, unknown>) {
  const rowData = props?.row?.original;
  const { postageInfo } = usePostageAtom();
  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();
  const { selectedRows, setSelectedRows } = usePostagePreviewStorage();

  const orderErrors = postageInfo?.isPostageErrors?.find(
    (err: any) => err.orderId === rowData?.channel_order_id
  );

  return (
    <div className="flex items-center gap-2">
      {orderErrors && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" size="sm" className="text-red-600">
              <CircleAlert className="mr-2 size-4" />
              Error
            </Button>
          </PopoverTrigger>
          <PopoverContent className="absolute right-0 z-[9999] w-80">
            <div className="space-y-3">
              {orderErrors.items.map((item: any, idx: number) => (
                <ul key={idx} className="list-disc space-y-2 pl-5 text-sm text-red-600">
                  {item.validationMessages.map((msg: any, i: number) => (
                    <li key={i} className="text-sm">
                      {msg}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator?.clipboard?.writeText(rowData?.channel_order_id)}
          >
            Copy Order ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              const postage = openOrdersWithStorage?.find(
                (e) => e?.channel_order_id === rowData?.channel_order_id
              );

              if (postage) {
                setOpenOrdersWithStorage((prev) => {
                  const newArray = [...prev];
                  const index = newArray?.findIndex((item) => item?.id === postage?.id);

                  if (index !== -1) {
                    newArray?.splice(index + 1, 0, { ...postage });
                  } else {
                    newArray?.push(postage);
                  }

                  return newArray;
                });
              }
            }}
          >
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const postages = openOrdersWithStorage?.filter(
                (row) => row?.channel_order_id !== props?.row?.original?.channel_order_id
              );

              setOpenOrdersWithStorage(postages);
              setSelectedRows(postages);
            }}
            className="text-red-500"
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
