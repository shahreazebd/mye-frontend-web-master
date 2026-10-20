import { ChangeEvent, useState } from "react";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { usePostagePreviewAtom } from "@/atoms/postageAtom";
import { cmToInches, convertGmToKGAndGm, convertGmToLbAndOz } from "@/utils/postage";

import { Input } from "@/components/ui/input";

interface Props {
  quantity: number;
  orderIndex: number;
  itemIndex: number;
  dimensions: string;
  dimensionsInches: string;
}

export function AmazonQuantityCell({
  quantity,
  orderIndex,
  itemIndex,
  dimensions,
  dimensionsInches,
}: Props) {
  const { openOrdersWithStorage, setOpenOrdersWithStorage } =
    useOpenOrderAtomWithStorage();
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const [isEditing, setIsEditing] = useState(false);
  const { handlePostagePreviewInfo } = usePostagePreviewAtom();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value;
    if (newValue === 0) {
      setUpdatedQuantity(1);
    }

    if (quantity !== newValue) {
      setUpdatedQuantity(newValue);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);

    if (quantity !== updatedQuantity) {
      const updatedOrders = openOrdersWithStorage.map((order, i) => {
        if (i === orderIndex) {
          const items = order?.items?.map((item, idx) => {
            if (idx === itemIndex) {
              return {
                ...item,
                quantity: updatedQuantity,
              };
            }
            return item;
          });

          const [, ...rest] = dimensions?.split(", ") || [];
          const [, ...restInches] = dimensionsInches?.split(", ") || [];

          const totalHeight = items.reduce((sum, item) => {
            const heightNum = parseFloat(item.height); // Convert string to number
            return sum + heightNum * item.quantity;
          }, 0);

          const totalHeightInches = items.reduce((sum, item) => {
            const heightNum = parseFloat(item.height); // Convert string to number
            return sum + cmToInches(heightNum * item.quantity);
          }, 0);

          // const newDimensionsInches = items
          //   .map(
          //     (item) =>
          //       `${cmToInches(+item?.height)}, ${cmToInches(+item?.width)}, ${cmToInches(
          //         Math.max(...items.map((e) => +e?.depth * item.quantity))
          //       )}`
          //   )
          //   .toString();

          const { totalKg, totalGm } = items.reduce(
            (acc, item) => {
              const { kg, gm } = convertGmToKGAndGm(+item?.weight * item.quantity);

              return {
                totalKg: acc.totalKg + kg,
                totalGm: acc.totalGm + gm,
              };
            },
            { totalKg: 0, totalGm: 0 }
          );

          const { totalLb, totalOz } = items.reduce(
            (acc, item) => {
              const { lb, oz } = convertGmToLbAndOz(+item?.weight * item.quantity);

              return {
                totalLb: acc.totalLb + lb,
                totalOz: acc.totalOz + oz,
              };
            },
            { totalLb: 0, totalOz: 0 }
          );
          const updated = {
            ...order,
            items: items,
            quantity: items.map((item) => item.quantity).join(","),
            dimensions: totalHeight + ", " + rest.join(", "),
            dimensionsInches: totalHeightInches + ", " + restInches.join(", "),
            kg: totalKg,
            gm: totalGm,
            lb: totalLb,
            oz: totalOz,
          };

          handlePostagePreviewInfo({ lastUpdatePostage: updated });
          return updated;
        }
        return order;
      });

      setOpenOrdersWithStorage(updatedOrders);
    }
  };

  return (
    <div onDoubleClick={toggleEditing} className="mb-7 w-20 border px-2 py-1 last:mb-0">
      {isEditing ? (
        <Input
          autoFocus
          type="number"
          min={1}
          className="h-8 w-14"
          onKeyDown={(e) => e.key === "Enter" && toggleEditing()}
          onChange={handleChange}
          onBlur={toggleEditing}
          value={updatedQuantity}
        />
      ) : (
        updatedQuantity
      )}
    </div>
  );
}

// const updatedOrders = openOrdersWithStorage.map((order, i) => {
//   if (i !== orderIndex) return order;

//   const updatedItems = order.items.map((item, idx) => {
//     if (idx !== itemIndex) return item;
//     return { ...item, quantity: updatedQuantity };
//   });

//   // Calculate dimensions
//   const getDimensions = (items: OrderItem[], converter = (v: any) => v) =>
//     items
//       .map((item) =>
//         [
//           converter(+item.height * item.quantity),
//           converter(+item.width * item.quantity),
//           converter(+item.depth * item.quantity),
//         ].join(", ")
//       )
//       .join(", ");

//   const newDimensions = getDimensions(updatedItems);
//   const newDimensionsInches = getDimensions(updatedItems, cmToInches);

//   // Calculate weights
//   const calculateWeight = (items: OrderItem[], converter: any) =>
//     items.reduce(
//       (acc, item) => {
//         const { kg, gm, lb, oz } = converter(+item.weight * item.quantity);
//         return {
//           totalKg: acc.totalKg + (kg || 0),
//           totalGm: acc.totalGm + (gm || 0),
//           totalLb: acc.totalLb + (lb || 0),
//           totalOz: acc.totalOz + (oz || 0),
//         };
//       },
//       { totalKg: 0, totalGm: 0, totalLb: 0, totalOz: 0 }
//     );

//   const { totalKg, totalGm } = calculateWeight(updatedItems, convertGmToKGAndGm);
//   const { totalLb, totalOz } = calculateWeight(updatedItems, convertGmToLbAndOz);

//   const updatedOrder = {
//     ...order,
//     items: updatedItems,
//     quantity: updatedItems.map((item) => item.quantity).join(","),
//     dimensions: newDimensions,
//     dimensionsInches: newDimensionsInches,
//     kg: totalKg,
//     gm: totalGm,
//     lb: totalLb,
//     oz: totalOz,
//   };

//   handlePostagePreviewInfo({ lastUpdatePostage: updatedOrder });
//   return updatedOrder;
// });
