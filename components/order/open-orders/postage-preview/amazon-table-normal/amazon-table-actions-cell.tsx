import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { usePostagePreviewAtom } from "@/atoms/postageAtom";
import {
  useAmazonRateOptions,
  useAmazonSelectedRates,
} from "@/atoms/shipment-preview-atom";
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
  rowId: string;
  channelOrderId: string;
  index: number;
}

export function AmazonTableActionCell({ rowId, channelOrderId, index }: Readonly<Props>) {
  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();

  const { setAmazonSelectedRates } = useAmazonSelectedRates();
  const { setAmazonRateOptions } = useAmazonRateOptions();
  const { handlePostagePreviewInfo } = usePostagePreviewAtom();

  function deleteOrder() {
    const postages = openOrdersWithStorage?.filter((_, i) => i !== index);
    setOpenOrdersWithStorage(postages);

    setAmazonSelectedRates((prev) => {
      // eslint-disable-next-line no-unused-vars
      const { [rowId]: _, ...rest } = prev;

      return rest;
    });

    setAmazonRateOptions((prev) => {
      // eslint-disable-next-line no-unused-vars
      const { [rowId]: _, ...rest } = prev;

      return rest;
    });
  }

  function handleDuplicateOrder() {
    const postage = openOrdersWithStorage?.[index];

    if (postage) {
      const baseId = Math.floor(postage.id);
      const existingOffsets = openOrdersWithStorage
        .filter((item) => Math.floor(item.id) === baseId)
        .map((item) => Math.round((item.id - baseId) * 100));
      const maxOffset = Math.max(...existingOffsets);

      if (maxOffset >= 99) return;

      const uniqueId = baseId + (maxOffset + 1) / 100;
      // Each duplicate gets its own fresh UUID — this becomes the rowId in the DB
      const duplicatedPostage = {
        ...postage,
        id: uniqueId,
        rateRecordId: crypto.randomUUID(),
      };

      // Insert the new row — do NOT copy rate options or selected rates.
      // The useEffect in postage-preview-wrapper will detect lastUpdatePostage change
      // and fire getAmazonRateAndUpdate which creates a new independent AmazonRate record.
      setOpenOrdersWithStorage((prev) => {
        const newArray = [...prev];
        newArray?.splice(index + 1, 0, duplicatedPostage);
        return newArray;
      });

      // Trigger a fresh rate fetch for the duplicated row
      handlePostagePreviewInfo({ lastUpdatePostage: duplicatedPostage });
    }
  }

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
        <DropdownMenuItem onClick={() => navigator?.clipboard?.writeText(channelOrderId)}>
          Copy Order ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDuplicateOrder}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteOrder} className="text-red-500">
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// import { useAmazonCarrierOptions, useSelectedCarrierKV } from "@/atoms/carriersAtom";
// import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
// import { Ellipsis } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface Props {
//   orderId: string;
//   index: number;
// }

// export function AmazonTableActionCell({ orderId, index }: Props) {
//   const { openOrdersWithStorage, setOpenOrdersWithStorage } =
//     useOpenOrderAtomWithStorage();

//   const { setSelectedCarrierKV } = useSelectedCarrierKV();
//   const { setAmazonCarrierOptions } = useAmazonCarrierOptions();

//   function deleteOrder() {
//     const postages = openOrdersWithStorage?.filter((_, i) => i !== index);
//     setOpenOrdersWithStorage(postages);

//     setAmazonCarrierOptions((prev) => {
//       // eslint-disable-next-line no-unused-vars
//       const { [orderId]: _, ...rest } = prev;

//       return rest;
//     });

//     setSelectedCarrierKV((prev) => {
//       // eslint-disable-next-line no-unused-vars
//       const { [orderId]: _, ...rest } = prev;

//       return rest;
//     });
//   }

//   // function handleDuplicateOrder() {
//   //   const postage = openOrdersWithStorage?.find((e) => e?.channel_order_id === orderId);

//   //   if (postage) {
//   //     setOpenOrdersWithStorage((prev) => {
//   //       const newArray = [...prev];
//   //       const index = newArray?.findIndex((item) => item?.id === postage?.id);

//   //       if (index !== -1) {
//   //         newArray?.splice(index + 1, 0, { ...postage });
//   //       } else {
//   //         newArray?.push(postage);
//   //       }

//   //       return newArray;
//   //     });
//   //   }
//   // }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="size-8 p-0">
//           <span className="sr-only">Open menu</span>
//           <Ellipsis className="size-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//         <DropdownMenuItem onClick={() => navigator?.clipboard?.writeText(orderId)}>
//           Copy Order ID
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         {/* <DropdownMenuItem onClick={handleDuplicateOrder}>Duplicate</DropdownMenuItem> */}
//         <DropdownMenuItem onClick={deleteOrder} className="text-red-500">
//           Remove
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
