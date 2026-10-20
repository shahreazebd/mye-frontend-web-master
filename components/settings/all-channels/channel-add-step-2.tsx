import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { XiorError } from "xior";
import { object, string, z } from "zod";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import useGetLocations from "@/hooks/queries/location/useGetLocations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import CountrySelect from "@/components/shared/country-select";

import { Channel } from "./channel-add-step-1";

const formSchema = object({
  name: string({ required_error: "Name is required" })
    .nonempty({ message: "First name must contain at least 1 character(s)" })
    .max(100, { message: "First name must contain at most 100 character(s)" }),
  country: string({ required_error: "Country is required" }).nonempty({
    message: "country must contain at least 1 character(s)",
  }),
  channel_max_stock: string({ required_error: "Max stock is required" })
    .max(4, {
      message: "Max stock must contain at most 4 digit",
    })
    .regex(/^\d+$/, "Invalid Number!")
    .transform(Number),
  // .max(10, { message: "Max stock must contain at most 10 digit" })
  // .nonempty({ message: "Max stock must contain at least 1 character(s)" })
  location_id: string({ required_error: "Location is required" }).nonempty({
    message: "Location must contain at least 1 character(s)",
  }),
  shop_url: string()
    .url()
    .max(100, { message: "Shop URL must contain at most 100 character(s)" })
    .optional(),
  consumer_key: string()
    .max(100, { message: "Consumer Key must contain at most 100 character(s)" })
    .optional(),
  consumer_secret: string()
    .max(100, { message: "Consumer Secret must contain at most 100 character(s)" })
    .optional(),
});

interface Props {
  step: number;
  channel: Channel;
  prevStep: () => void;
}

export default function ChannelAddStep2({ channel, prevStep }: Readonly<Props>) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: locations } = useGetLocations();
  const { userInformation } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  useEffect(() => {
    if (form) {
      form.reset();
    }
  }, [form]);

  const auth = (site: any) => {
    const countryName = typeof site === "string" ? site : site?.country;
    let URI = "";

    if (channel.name === "Amazon") {
      let end_point_extension;

      if (countryName === "United States of America") {
        end_point_extension = "com";
      } else if (countryName === "United Kingdom") {
        end_point_extension = "co.uk";
      } else if (countryName === "Australia") {
        end_point_extension = "com.au";
      } else if (countryName === "Germany") {
        end_point_extension = "de";
      } else {
        end_point_extension = "com";
      }

      URI = `https://sellercentral.amazon.${end_point_extension}/apps/authorize/consent?application_id=amzn1.sp.solution.5978c345-3158-4941-abbb-0d0d9b72575d&state=stateexample&version=beta`;
    } else if (channel.name === "Ebay") {
      URI =
        "https://auth.ebay.com/oauth2/authorize?client_id=EvidentB-mye-PRD-7a28ec690-fd9b983c&response_type=code&redirect_uri=Evident_BD_Ltd-EvidentB-mye-PR-gamzbydd&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/commerce.message";
    } else if (channel.name === "TikTok") {
      URI =
        countryName === "United States of America"
          ? "https://services.us.tiktokshop.com/open/authorize?service_id=7436612112146466615"
          : "https://services.tiktokshop.com/open/authorize?service_id=7436612112146466615";
    }

    window.location.href = URI;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let sendData: any = {};

    setIsLoading(() => true);

    const commonObj = {
      channel_uid: "REQUESTED",
      company_uid: userInformation?.company_uid,
      channel_state: "APPLIED",
    };

    if (channel.name === "Amazon") {
      sendData = {
        ...values,
        ...commonObj,
        channel_type: "amazon",
      };
      localStorage.setItem("channelData", JSON.stringify(sendData));
      localStorage.removeItem("reconnect");

      auth(sendData);
    } else if (channel.name === "Ebay") {
      sendData = {
        ...values,
        ...commonObj,
        channel_type: "ebay",
      };
      localStorage.setItem("channelData", JSON.stringify(sendData));
      localStorage.removeItem("reconnect");

      auth(sendData);
    } else if (channel.name === "TikTok") {
      sendData = {
        ...values,
        ...commonObj,
        channel_type: "tiktok",
      };
      localStorage.setItem("channelData", JSON.stringify(sendData));
      localStorage.removeItem("reconnect");

      auth(sendData);
    } else if (channel.name === "WooCommerce") {
      sendData = {
        ...values,
        ...commonObj,
        channel_type: "woocommerce",
      };

      try {
        await fetch.post(
          "/integration/api/v1/channel/add-channel/woocommerce/",
          sendData
        );

        queryClient.invalidateQueries(["get-channels", userInformation?.company_uid]);

        toast({
          title: "Success",
          description: "You have successfully integrate woocommerce.",
        });
      } catch (error: unknown) {
        if (error instanceof XiorError) {
          toast({
            title: "Error",
            description: error.response?.data.message,
            variant: "destructive",
          });
        } else if (error instanceof Error)
          toast({ title: "Error", description: error.message, variant: "destructive" });
        else {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(() => false);
      }
    }
    setIsLoading(() => false);
  }

  const extraFields = (
    <>
      <FormField
        control={form.control}
        name="shop_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shop Url</FormLabel>
            <FormControl>
              <Input placeholder="Enter Your Shop Url.." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="consumer_key"
        render={({ field }) => (
          <FormItem>
            <span className="flex justify-between">
              <FormLabel>Consumer Key</FormLabel>

              <span className="text-end text-xs font-medium text-blue-700 hover:text-blue-900">
                <Link target="_blank" href="/integrations/channels/woocommerce">
                  ** How to get Consumer Key?
                </Link>
              </span>
            </span>
            <FormControl>
              <Input placeholder="Enter Your Consumer Key.." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="consumer_secret"
        render={({ field }) => (
          <FormItem>
            <span className="flex justify-between">
              <FormLabel>Consumer Secret</FormLabel>

              <span className="text-end text-xs font-medium text-blue-700 hover:text-blue-900">
                <Link target="_blank" href="/integrations/channels/woocommerce">
                  ** How to get Consumer Secret?
                </Link>
              </span>
            </span>
            <FormControl>
              <Input placeholder="Enter Your Consumer Secret.." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  return (
    <div
    // className="absolute opacity-0"
    // animate={{ x: step > 1 ? 0 : 1000, y: -620, opacity: step > 1 ? 1 : 0 }}
    // transition={{
    //   ease: "easeInOut",
    //   duration: 0.5,

    //   x: { duration: 0.5 },
    // }}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-semibold">{channel.name}</h1>
          <p className="mt-1 text-sm">{channel.description}</p>
        </div>

        <Image src={channel.logo} alt={channel.name} width={100} height={100} />
      </div>

      <ScrollArea className="mr-2 mt-5 h-[calc(100vh-460px)] px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="m-1 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Channel Name.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {channel.name === "WooCommerce" ? extraFields : ""}

            <FormField
              control={form.control}
              name="channel_max_stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel max stock</FormLabel>
                  <FormControl>
                    <Input
                      // type="number"
                      placeholder="Enter Your Channel Max Stock.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelect className="w-[350px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations?.map((location) => (
                        <SelectItem
                          key={location?.id?.toString()}
                          value={location?.id?.toString()}
                        >
                          {location?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" variant="outline" onClick={prevStep} size="sm">
              Back
            </Button>

            <Button
              loading={isLoading}
              type="submit"
              variant="default"
              className="ml-2"
              size="sm"
              disabled={isLoading || !form?.formState?.isValid}
            >
              Submit
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
