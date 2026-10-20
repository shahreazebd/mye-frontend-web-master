import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useSendSupport from "@/hooks/queries/support/use-send-support";
import useImageUpload from "@/hooks/queries/upload/useImageUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import useImageUpload from "@/hooks/rq/upload/useImageUpload";
import { FileInput } from "@/components/file-input";

const formSchema = z.object({
  email_subject: z
    .string({ required_error: "Subject is required" })
    .min(1, { message: "Subject is required" }),
  email_content: z
    .string({ required_error: "Message is required" })
    .min(1, { message: "Message is required" })
    .max(3000, { message: "Message maximum length 3000 characters" }),
});

interface Props {
  setSupportModal: Dispatch<SetStateAction<boolean>>;
  supportModal: boolean;
}

export default function SupportBoxModal({ setSupportModal, supportModal }: Props) {
  const { mutate, isLoading } = useSendSupport();
  const { userInformation } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { imageUploadWithDZ: attachmentImageImageUploadHandler, edgeUrl: attachmentUrl } =
    useImageUpload({ service: "adventure-launch" });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      first_name: userInformation?.name,
      email_from: userInformation?.user_email,
      email_to: "info@manageyourecommerce.com",
      email_type: "plain",
      email_for: "support",
      attachment: attachmentUrl ? [attachmentUrl] : [],
    };

    mutate(payload, {
      onSuccess: () => {
        form.reset();
        setSupportModal(false);
      },
    });
  }

  return (
    <Dialog open={supportModal} onOpenChange={() => setSupportModal(false)}>
      <DialogContent className="w-1/4">
        <DialogHeader>
          <DialogTitle className="mb-1 text-base text-slate-500">Support Box</DialogTitle>
          <p className="mb-6 text-sm text-[#6E7B91]">Please explain your needs here</p>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* for Subject */}
            <FormField
              control={form.control}
              name="email_subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-500">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Write the topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* for message */}
            <FormField
              control={form.control}
              name="email_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-500">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      cols={20}
                      rows={7}
                      placeholder="Write queries here..."
                      {...field}
                      className="h-[120px] w-full resize-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* for Attachment */}
            <div className="mt-3">
              <label htmlFor="attachment" className="text-sm text-slate-500">
                Attachment (JPG/PNG)
              </label>
              <div className="mt-2">
                <FileInput
                  accept={{
                    "image/*": [".png", ".jpeg", ".jpg"],
                  }}
                  name="attachment"
                  setFiles={attachmentImageImageUploadHandler}
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
