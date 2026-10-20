import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  ConversationDetailApiResponse,
  ConversationsApiResponse,
  EbayMessageItem,
  SendMessageApiResponse,
  SendMessagePayload,
} from "@/types/messages";
import fetch from "@/config/xior";

export async function sendMessage({
  channel_uid,
  conversation_id,
  message_text,
  email_copy_to_sender,
  reference_id,
  reference_type,
  message_media,
}: SendMessagePayload): Promise<SendMessageApiResponse> {
  const URL = "/ebay/api/v1/messaging/send_message";

  return fetch
    .post<SendMessageApiResponse>(URL, {
      channel_uid,
      conversation_id,
      message_text,
      ...(email_copy_to_sender !== undefined && { email_copy_to_sender }),
      ...(reference_id && { reference_id }),
      ...(reference_type && { reference_type }),
      ...(message_media && message_media.length > 0 && { message_media }),
    })
    .then((res) => res.data);
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onMutate: async (newMsg: SendMessagePayload) => {
      // 1. Cancel ongoing queries so they don't overwrite optimistic update
      await queryClient.cancelQueries({
        queryKey: ["messaging-conversation-detail-infinite", newMsg.conversation_id],
      });
      await queryClient.cancelQueries({
        queryKey: ["messaging-conversations-infinite"],
      });

      // 2. Snapshot previous state for rollback
      const previousDetails = queryClient.getQueriesData<
        InfiniteData<ConversationDetailApiResponse>
      >({
        queryKey: ["messaging-conversation-detail-infinite", newMsg.conversation_id],
      });

      const previousConversations = queryClient.getQueriesData<
        InfiniteData<ConversationsApiResponse>
      >({
        queryKey: ["messaging-conversations-infinite"],
      });

      // 3. Construct optimistic message
      const nowIso = new Date().toISOString();
      const optimisticMessage: EbayMessageItem & {
        created_date: string;
        sender_username: string;
        message_body: string;
      } = {
        messageId: `optimistic-${Date.now()}`,
        messageBody: newMsg.message_text,
        message_body: newMsg.message_text,
        senderUsername: newMsg.sender_username || "seller",
        sender_username: newMsg.sender_username || "seller",
        recipientUsername: "",
        readStatus: true,
        createdDate: nowIso,
        created_date: nowIso,
        ...(newMsg.message_media && newMsg.message_media.length > 0
          ? { messageMedia: newMsg.message_media }
          : {}),
      };

      // 4. Optimistically update conversation thread
      queryClient.setQueriesData<InfiniteData<ConversationDetailApiResponse>>(
        {
          queryKey: ["messaging-conversation-detail-infinite", newMsg.conversation_id],
        },
        (old) => {
          if (!old?.pages?.length) return old;

          const newPages = [...old.pages];
          const lastIndex = newPages.length - 1;
          const targetPage = newPages[lastIndex];

          newPages[lastIndex] = {
            ...targetPage,
            data: {
              ...targetPage.data,
              messages: [...(targetPage.data?.messages || []), optimisticMessage],
            },
          };

          return {
            ...old,
            pages: newPages,
          };
        }
      );

      // 5. Optimistically update conversation list (last message & timestamp)
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
                  if (conv.conversationId === newMsg.conversation_id) {
                    return {
                      ...conv,
                      latestMessage: optimisticMessage,
                    };
                  }
                  return conv;
                }),
              },
            })),
          };
        }
      );

      return { previousDetails, previousConversations };
    },
    onSuccess: (res) => {
      openSuccessNotification({
        description: res?.message || "Message sent successfully",
      });
    },
    onError: (err: any, _newMsg, context) => {
      // Roll back on error
      context?.previousDetails?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      context?.previousConversations?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });

      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send message. Please try again.";
      openErrorNotification({ description: errorMessage });
    },
    onSettled: (_res, _err, variables) => {
      // Refetch from server to sync final state
      queryClient.invalidateQueries([
        "messaging-conversation-detail-infinite",
        variables.conversation_id,
      ]);
      queryClient.invalidateQueries(["messaging-conversations-infinite"]);
    },
  });
}
