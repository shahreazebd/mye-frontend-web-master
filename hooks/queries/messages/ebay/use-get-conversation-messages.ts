import { useInfiniteQuery } from "@tanstack/react-query";

import {
  ConversationDetailApiResponse,
  GetConversationMessagesParams,
} from "@/types/messages";
import fetch from "@/config/xior";

export function getConversationMessages(params: GetConversationMessagesParams) {
  const URL = `/ebay/api/v1/messaging/conversations/${params.conversation_id}`;

  return fetch
    .get<ConversationDetailApiResponse>(URL, {
      params: {
        channel_uid: params.channel_uid,
        conversation_type: params.conversation_type,
        limit: params.limit ?? 50,
        offset: params.offset ?? 0,
      },
    })
    .then((res) => res.data);
}

export function useGetInfiniteConversationMessages(
  params: GetConversationMessagesParams
) {
  return useInfiniteQuery<ConversationDetailApiResponse>({
    queryKey: [
      "messaging-conversation-detail-infinite",
      params.conversation_id,
      params.channel_uid,
      params.conversation_type,
    ],
    queryFn: ({ pageParam = 0 }) =>
      getConversationMessages({
        ...params,
        offset: pageParam as number,
        limit: params.limit ?? 50,
      }),
    getNextPageParam: (lastPage) => {
      if (
        lastPage?.data?.next_offset !== null &&
        lastPage?.data?.next_offset !== undefined
      ) {
        return lastPage.data.next_offset;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (
        firstPage?.data?.prev_offset !== null &&
        firstPage?.data?.prev_offset !== undefined
      ) {
        return firstPage.data.prev_offset;
      }
      return undefined;
    },
    enabled: Boolean(params.conversation_id && params.channel_uid),
    refetchInterval: 30_000,
    refetchOnWindowFocus: false,
  });
}
