import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
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

interface Props {
  orderId: string;
  index: number;
}

export function AmazonTableActionCell({ orderId, index }: Props) {
  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();

  function deleteOrder() {
    const postages = openOrdersWithStorage?.filter((_, i) => i !== index);
    setOpenOrdersWithStorage(postages);
  }

  // function handleDuplicateOrder() {
  //   const postage = openOrdersWithStorage?.find((e) => e?.channel_order_id === orderId);

  //   if (postage) {
  //     setOpenOrdersWithStorage((prev) => {
  //       const newArray = [...prev];
  //       const index = newArray?.findIndex((item) => item?.id === postage?.id);

  //       if (index !== -1) {
  //         newArray?.splice(index + 1, 0, { ...postage });
  //       } else {
  //         newArray?.push(postage);
  //       }

  //       return newArray;
  //     });
  //   }
  // }

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
        <DropdownMenuItem onClick={() => navigator?.clipboard?.writeText(orderId)}>
          Copy Order ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={handleDuplicateOrder}>Duplicate</DropdownMenuItem> */}
        <DropdownMenuItem onClick={deleteOrder} className="text-red-500">
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
