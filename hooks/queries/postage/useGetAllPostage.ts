import { usePostageAtom } from "@/atoms/postageAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { Postage, PostageOrder } from "@/types/postage";
import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

// Helper: Remove duplicate orders by tracking number
// function removeDuplicatesByTrackingNumber(data: PostageOrder[]): PostageOrder[] {
//   const seen = new Set<string>();
//   return data.filter(({ trackingNumber }) => {
//     if (!trackingNumber || trackingNumber === "N/A") return true;
//     if (!seen.has(trackingNumber)) {
//       seen.add(trackingNumber);
//       return true;
//     }
//     return false;
//   });
// }

// Fetch function for postage data
const fetchOrdersTableData = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<[string, string, { date: Date; channelUuid: string }]>) => {
  const [, companyUid, filters] = queryKey;

  const params: Record<string, any> = {
    companyUuid: companyUid,
    limit: 100,
    page: pageParam,
    startDate: dayjs(filters.date).format("YYYY-MM-DD"),
    endDate: dayjs(filters.date).format("YYYY-MM-DD"),
  };

  if (filters.channelUuid !== "all") {
    params.channelUuid = filters.channelUuid;
  }

  const response = await fetch.get("/postage-storage/api/v1/postages", { params });
  return response?.data?.data as Postage[];
};

function countDuplicateTrackingNumbers(orders: PostageOrder[]) {
  // Extract tracking numbers, excluding null/undefined
  const trackingNumbers = orders
    .map((order) => order.trackingNumber)
    .filter((number) => number !== null && number !== undefined);

  // Count occurrences of each tracking number
  const numberCounts = trackingNumbers.reduce<Record<string, number>>((acc, number) => {
    acc[number] = (acc[number] || 0) + 1;
    return acc;
  }, {});

  // Count tracking numbers that appear more than once
  const duplicateCount = Object.values(numberCounts).filter((count) => count > 1).length;

  return duplicateCount;
}

export default function useGetAllPostage() {
  const { userInformation } = useAuth();
  const { postageInfo } = usePostageAtom();

  return useQuery(
    ["get-postages", userInformation?.company_uid ?? "", postageInfo.filters],
    fetchOrdersTableData,
    {
      enabled: Boolean(userInformation?.company_uid),
      refetchIntervalInBackground: false,
      select: (postages) =>
        postages?.map((postage) => {
          const { orders, channel, service, totalOrderCount = 0 } = postage ?? {};

          const vendorImageSrc = `/logos/marketplaces/round/${channel?.channel_type}.svg`;
          const carriersLogoSrc =
            service?.name === "AMAZON"
              ? "/logos/marketplaces/round/amazon.svg"
              : `/logos/carriers/round/${service?.type?.toLowerCase()}.svg`;

          const successOrdersCount = orders.filter((o) => o.status === "SUCCESS").length;
          const failedOrdersCount = orders.filter((o) => o.status === "FAILED").length;
          const mergeOrderCount = countDuplicateTrackingNumbers(orders);
          const processed = successOrdersCount + failedOrdersCount;
          const progress =
            totalOrderCount > 0 ? Math.trunc((processed / totalOrderCount) * 100) : 0;
          const totalPostageCount = successOrdersCount - mergeOrderCount;

          return {
            ...postage,
            progress,
            vendorImageSrc,
            carriersLogoSrc,
            mergeOrderCount,
            successOrdersCount,
            failedOrdersCount,
            totalPostageCount,
            totalOrderCount: processed > totalOrderCount ? processed : totalOrderCount,
          };
        }),
    }
  );
}
