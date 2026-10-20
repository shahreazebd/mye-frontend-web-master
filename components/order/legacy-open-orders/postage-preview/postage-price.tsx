import { useSelectedCarrierKV } from "@/atoms/carriersAtom";

export function PostagePrice({ orderId }: { orderId: string }) {
  const { selectedCarrierKV } = useSelectedCarrierKV();
  const carrierData = selectedCarrierKV[orderId];

  return (
    <span>
      {carrierData?.Rate.Amount?.toFixed(2)} {carrierData?.Rate?.CurrencyCode}{" "}
    </span>
  );
}
