import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

interface ResponseFormat {
  status: string;
  month: {
    one: number;
    six: number;
    twelve: number;
  };
}

interface StatsResponse {
  data: {
    percentage: {
      one_year_positive_count: number;
      one_year_total_count: number;
      one_year_positive_percentage: number;
    };
    response_format: ResponseFormat[];
  };
}

const getEbayFeedbackStats = ({ queryKey }: QueryFunctionContext) => {
  const [, channelUid] = queryKey;
  const URL = `/ebay-message/api/v1/feedback/get-single-channel-feedback-statistics?channel_uid=${channelUid}`;

  return fetch.get(URL).then<StatsResponse>((res) => res?.data);
};

export default function useGetEbayFeedbackStats(channelUid: string) {
  return useQuery(["get-ebay-feedbacks-stats", channelUid], getEbayFeedbackStats, {
    enabled: !!channelUid,
  });
}
