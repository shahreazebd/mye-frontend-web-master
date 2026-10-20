"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Channel } from "@/schema/channel";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, AlertTriangle, Info, Loader2, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useRetrieveMarketplaceOrders } from "@/hooks/queries/order/use-retrieve-marketplace-orders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface RetrieveOrdersButtonProps {
  channel: Channel | null;
}

export function RetrieveOrdersButton({ channel }: Readonly<RetrieveOrdersButtonProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  const channelUid = channel?.channel_uid;
  const isHourBased = ["AMAZON", "EBAY"].includes(
    channel?.channel_type?.toUpperCase() || ""
  );

  const formSchema = useMemo(() => {
    if (isHourBased) {
      return z.object({
        value: z.coerce
          .number({
            invalid_type_error: "Please enter a valid number of hours.",
          })
          .min(1, "Minimum is 1 hour.")
          .max(24, "Maximum is 24 hours."),
      });
    }
    return z.object({
      value: z.coerce
        .number({
          invalid_type_error: "Please enter a valid number of days.",
        })
        .min(1, "Minimum is 1 day.")
        .max(4, "Maximum is 4 days."),
    });
  }, [isHourBased]);

  const { mutate: retrieveMarketplaceOrders, isLoading: isApiLoading } =
    useRetrieveMarketplaceOrders(channelUid || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: isHourBased ? 4 : 1,
    },
  });

  // Track cooldown using localStorage so it persists across page reloads
  useEffect(() => {
    if (!channelUid) return;

    const checkCooldown = () => {
      const cooldownEnd = localStorage.getItem(`cooldown_order_retrieve_${channelUid}`);
      if (cooldownEnd) {
        const remaining = Math.ceil((Number(cooldownEnd) - Date.now()) / 1000);
        if (remaining > 0) {
          setCountdown(remaining);
          setIsCooldownActive(true);
          return;
        }
      }
      setIsCooldownActive(false);
      setCountdown(0);
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [channelUid]);

  // Whenever channel or isHourBased changes, reset form values
  useEffect(() => {
    form.reset({
      value: isHourBased ? 4 : 1,
    });
  }, [channel, isHourBased, form]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      form.reset({ value: isHourBased ? 4 : 1 });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!channelUid || !channel?.channel_type) return;

    const payload = {
      channelUid,
      channelType: channel.channel_type,
      ...(isHourBased ? { hour: values.value } : { daysAgo: values.value }),
    };

    retrieveMarketplaceOrders(payload, {
      onSuccess: () => {
        setIsOpen(false);
        // Set 1-minute cooldown (60 seconds)
        const endTimestamp = Date.now() + 60 * 1000;
        localStorage.setItem(
          `cooldown_order_retrieve_${channelUid}`,
          endTimestamp.toString()
        );
        setCountdown(60);
        setIsCooldownActive(true);
      },
    });
  };

  if (!channel || !channelUid || channelUid === "all") {
    return null;
  }

  const channelTypeFormatted = channel.channel_type?.toLowerCase() || "";
  const displayChannelType = channel.channel_type || "Marketplace";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/20 hover:border-primary/40 flex items-center gap-2"
          disabled={isCooldownActive}
        >
          {isCooldownActive ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Retrieve Orders ({countdown}s)</span>
            </>
          ) : (
            <>
              <RefreshCw className="size-3.5" />
              <span>Retrieve Orders</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
                <RefreshCw className="size-5 text-primary" />
                Retrieve Orders
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Retrieve missing orders directly from your marketplace integration.
              </DialogDescription>
            </DialogHeader>

            {/* Minimized Target Channel Info */}
            <div className="bg-muted/40 my-3 flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
              <div className="relative flex size-8 shrink-0 items-center justify-center rounded bg-background p-1 shadow-sm">
                <Image
                  src={`/logos/marketplaces/${channelTypeFormatted}.svg`}
                  alt={displayChannelType}
                  width={20}
                  height={20}
                  className="object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <span className="font-semibold text-foreground">{channel.name}</span>
                <span className="ml-1.5 text-xs capitalize text-muted-foreground">
                  ({displayChannelType})
                </span>
              </div>
            </div>

            {/* Instructions */}
            <div className="border-primary/10 bg-primary/5 flex items-start gap-2.5 rounded-lg border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Use this form to fetch missing orders from the marketplace if they are not
                syncing automatically.
              </span>
            </div>

            {/* Warning Section */}
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2.5 text-xs leading-relaxed text-amber-800 dark:text-amber-300">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-500" />
              <div>
                <strong className="mb-0.5 block font-semibold text-amber-900 dark:text-amber-200">
                  Rate Limit Warning{" "}
                </strong>
                Please do not request retrievals frequently. Repeated sync operations can
                result in the marketplace temporarily blocking your connection.
              </div>
            </div>

            {/* Input Form Field */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <AlertCircle className="size-4 text-muted-foreground" />
                    {isHourBased
                      ? "How many hours of orders would you like to retrieve?"
                      : "How many days of orders would you like to retrieve?"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={isHourBased ? 24 : 4}
                      disabled={isApiLoading}
                      placeholder={isHourBased ? "e.g. 4" : "e.g. 1"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    {isHourBased
                      ? "Recommended: 4 hours. Maximum request is 24 hours."
                      : "Recommended: 1 day. Maximum request is 4 days."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isApiLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isApiLoading}
                className="flex items-center gap-2"
              >
                {isApiLoading && <Loader2 className="size-4 animate-spin" />}
                <span>Retrieve Orders</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
