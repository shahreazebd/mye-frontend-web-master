import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useGetChannels from "@/hooks/queries/channel/useGetChannels";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PropsType = {
  handleContinue: () => void;
};

const FormSchema = z.object({
  action: z.string({ required_error: "Please select a action" }),
});

function SmartMapping({ handleContinue }: PropsType) {
  const { data: allChannels } = useGetChannels();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      action: allChannels?.length ? (allChannels[0].channel_uid as string) : "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
    handleContinue();
  }

  return (
    <>
      {allChannels?.length ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Your Channel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={allChannels[0].channel_uid}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allChannels?.map((channel) => {
                        return (
                          <SelectItem
                            key={channel.channel_uid}
                            value={channel.channel_uid}
                          >
                            {channel.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Button
                type="submit"
                className="mx-auto block w-8/12 bg-slate-900 text-white"
              >
                Proceed
              </Button>
              <Button
                type="button"
                className="mx-auto block w-3/12 bg-newPrimary"
                onClick={handleContinue}
              >
                Setup Later
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="mt-6 flex items-center space-x-4">
          <p>loading...</p>
        </div>
      )}
    </>
  );
}

export default SmartMapping;
