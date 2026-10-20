import { extractUploadErrorMessage } from "@/utils/error";
import { useMutation } from "@tanstack/react-query";

import { MessageMedia, MessageMediaType } from "@/types/messages";
import { useToast } from "@/components/ui/use-toast";

import { uploadMedia } from "../../../custom/use-upload-media";

export type UploadedMessageMedia = Required<MessageMedia>;

export function getMessageMediaType(fileName: string): MessageMediaType {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "PDF";
  if (ext === "doc" || ext === "docx") return "DOC";
  if (ext === "txt") return "TXT";
  return "IMAGE";
}

async function uploadMessageMedia(file: File) {
  const result = await uploadMedia({
    file,
    path: "mye-message-media/",
  });

  return {
    mediaName: file.name,
    mediaType: getMessageMediaType(file.name),
    mediaUrl: result.url,
  };
}

export function useUploadMessageMedia() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: uploadMessageMedia,
    onError: (error) => {
      const message = extractUploadErrorMessage(error);
      console.log({ message });

      toast({
        title: message,
        description: "Please upload non empty file",
        variant: "destructive",
      });
    },
  });
}
