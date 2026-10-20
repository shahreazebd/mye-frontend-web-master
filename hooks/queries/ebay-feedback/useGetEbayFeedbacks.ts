import { channelAtom } from "@/atoms/channelAtom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { isDataSelected, objectSearch } from "utils/helpers";

import fetch from "@/config/xior";

export interface EbayFeedback {
  _id: {
    $oid: string;
  };
  feedback_id: string;
  channel_uid: string;
  feedback_details: {
    CommentingUser: string;
    FeedbackRatingStar: string;
    CommentingUserScore: string;
    CommentText: string;
    CommentTime: string;
    CommentType: string;
    ItemID: string;
    Role: string;
    FeedbackID: string;
    TransactionID: string;
    OrderLineItemID: string;
    ItemTitle: string;
    ItemPrice: {
      _currencyID: string;
      value: string;
    };
  };
  feedback_time: {
    $date: number;
  };
}

const getEbayFeedbacks = ({ queryKey }: QueryFunctionContext) => {
  const [, channelUid] = queryKey;
  const URL = `/ebay-message/api/v1/feedback/get-single-channel-feedbacks?channel_uid=${channelUid}`;
  return fetch.get(URL);
};

export default function useGetEbayFeedbacks(filters: {
  feedbackQ: string;
  feedbackStatus: string;
}) {
  const [channel] = useAtom(channelAtom);

  return useQuery(["get-ebay-feedbacks", channel?.uuid], getEbayFeedbacks, {
    enabled: !!channel?.uuid,
    select: (feedbacks) => {
      const filterData = feedbacks.data.data.filter((feedback: any) => {
        const status = isDataSelected(
          feedback.feedback_details,
          filters.feedbackStatus,
          "CommentType"
        );

        const search = objectSearch(feedback.feedback_details, filters.feedbackQ, [
          "CommentText",
          "CommentingUser",
          "CommentTime",
          "CommentType",
          "CommentingUserScore",
          "Role",
          "ItemID",
        ]);

        return status && search;
      });

      return [...filterData] as EbayFeedback[];
    },
  });
}
