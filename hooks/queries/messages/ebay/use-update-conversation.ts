import { openErrorNotification } from "@/utils/notification";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  ConversationsApiResponse,
  UpdateConversationApiResponse,
  UpdateConversationPayload,
} from "@/types/messages";
import fetch from "@/config/xior";

export async function updateConversation({
  channel_uid,
  conversation_id,
  read,
}: UpdateConversationPayload): Promise<UpdateConversationApiResponse> {
  const URL = `/ebay/api/v1/messaging/conversations/${conversation_id}/update`;

  return fetch
    .post<UpdateConversationApiResponse>(
      URL,
      {},
      {
        params: {
          channel_uid,
          read,
        },
      }
    )
    .then((res) => res.data);
}

export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateConversation,
    onMutate: async ({ conversation_id, read }) => {
      // 1. Cancel ongoing queries so they don't overwrite optimistic update
      await queryClient.cancelQueries({
        queryKey: ["messaging-conversations-infinite"],
      });

      // 2. Snapshot previous state for rollback
      const previousConversations = queryClient.getQueriesData<
        InfiniteData<ConversationsApiResponse>
      >({
        queryKey: ["messaging-conversations-infinite"],
      });

      // 3. Optimistically update conversation read status in cache
      queryClient.setQueriesData<InfiniteData<ConversationsApiResponse>>(
        { queryKey: ["messaging-conversations-infinite"] },
        (old) => {
          if (!old?.pages?.length) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                conversations: page.data?.conversations?.map((conv) => {
                  if (conv.conversationId === conversation_id) {
                    return {
                      ...conv,
                      unreadCount: read ? 0 : Math.max(conv.unreadCount, 1),
                      latestMessage: conv.latestMessage
                        ? {
                            ...conv.latestMessage,
                            readStatus: read,
                          }
                        : undefined,
                    };
                  }
                  return conv;
                }),
              },
            })),
          };
        }
      );

      return { previousConversations };
    },
    onError: (err: any, _vars, context) => {
      // Roll back on error
      context?.previousConversations?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });

      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update conversation status. Please try again.";
      openErrorNotification({ description: errorMessage });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["messaging-conversations-infinite"]);
    },
  });
}
