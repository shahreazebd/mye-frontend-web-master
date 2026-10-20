import { atom, useAtom } from "jotai";

import { AmazonBulkRate, Rate } from "@/hooks/queries/shipments/fetchAmazonBulkRates";

const amazonRateOptionsAtom = atom({} as Record<string, AmazonBulkRate>);
const amazonSingleRateAtom = atom({
  isLoading: false,
  orderId: "",
});

export function useAmazonRateOptions() {
  const [amazonRateOptions, setAmazonRateOptions] = useAtom(amazonRateOptionsAtom);
  const [amazonSingleRate, setAmazonSingleRate] = useAtom(amazonSingleRateAtom);

  return {
    amazonRateOptions,
    setAmazonRateOptions,
    amazonSingleRate,
    setAmazonSingleRate,
  };
}

const amazonSelectedRatesAtom = atom({} as Record<string, Rate | null>);

export function useAmazonSelectedRates() {
  const [amazonSelectedRates, setAmazonSelectedRates] = useAtom(amazonSelectedRatesAtom);

  return {
    amazonSelectedRates,
    setAmazonSelectedRates,
  };
}
