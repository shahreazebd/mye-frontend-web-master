import { useInfiniteQuery } from "@tanstack/react-query";

import { ConversationsApiResponse, GetConversationsParams } from "@/types/messages";
import fetch from "@/config/xior";

export async function getConversations(params: GetConversationsParams) {
  const URL = "/ebay/api/v1/messaging/conversations";

  return fetch
    .get<ConversationsApiResponse>(URL, {
      params: {
        channel_uid: params.channel_uid,
        conversation_type: params.conversation_type || "FROM_MEMBERS",
        conversation_status: params.conversation_status || "ACTIVE",
        limit: params.limit ?? 50,
        offset: params.offset ?? 0,
        start_date: params.start_date,
        end_date: params.end_date,
      },
    })
    .then((res) => res.data);
}

export function useGetInfiniteConversations(params: GetConversationsParams) {
  return useInfiniteQuery<ConversationsApiResponse>({
    queryKey: ["messaging-conversations-infinite", params],
    queryFn: ({ pageParam = 0 }) =>
      getConversations({
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
    enabled: Boolean(params.channel_uid),
    refetchInterval: 30_000,
    refetchOnWindowFocus: false,
  });
}
