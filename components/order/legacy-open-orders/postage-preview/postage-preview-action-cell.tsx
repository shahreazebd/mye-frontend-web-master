// import { usePostageAtom } from "@/atoms/postageAtom";

import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { CellContext } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//

export function PostagePreviewActionCell(props: CellContext<MappedOpenOrder, unknown>) {
  // const { setPostageInfo } = usePostageAtom();

  const rowData = props?.row?.original;

  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();

  return (
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
              (_, i) => i !== +props?.row.id
            );
            setOpenOrdersWithStorage(postages);
          }}
          className="text-red-500"
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
