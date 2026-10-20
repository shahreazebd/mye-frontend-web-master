import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { XiorError } from "xior";

import fetch from "@/config/xior";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface RetrieveProductsButtonProps {
  channelUid?: string;
  channelType?: string;
}

export function RetrieveProductsButton({
  channelUid: propChannelUid,
  channelType: propChannelType,
}: Readonly<RetrieveProductsButtonProps>) {
  const [inputValue, setInputValue] = useState("");
  const [isRetrieveDisabled, setIsRetrieveDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { userInformation } = useAuth();
  const params = useParams<{ channel_uid: string }>();

  const channelUid = propChannelUid || params.channel_uid;

  const { data: channelDetails } = useGetChannelDetails(
    propChannelType ? "" : channelUid
  );

  const channelType = propChannelType || channelDetails?.channel_type;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  async function retrieveButtonHandler(useInputValue: boolean = false) {
    try {
      const companyUid = userInformation?.company_uid;

      let URI = `/integration/api/v1/channel/product-retrive/${companyUid}/${channelUid}/`;
      if (channelType === "amazon") {
        URI = `/amazon/api/v2/products/fetch/${channelUid}`;
        if (useInputValue && inputValue) {
          URI += `?days_ago=${inputValue}`;
        }
      }

      const { data } = await fetch.get(URI);
      toast({
        title: channelType === "amazon" ? data?.message : data.data,
      });
    } catch (error) {
      if (error instanceof XiorError && error.response) {
        if (error.response.status === 500) {
          toast({
            title: "Network error",
            description: "Please try again",
            variant: "destructive",
          });
        }
      }
    }
  }

  async function handleRetrieveClick() {
    setInputValue("");
    setIsRetrieveDisabled(true);
    setCountdown(15);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRetrieveDisabled(false);

          queryClient.invalidateQueries({
            queryKey: ["remote-product-mapping-data"],
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    await retrieveButtonHandler(false);
  }

  return (
    <DropdownMenu>
      <div className="inline-flex h-8">
        <Button
          variant="outline"
          loading={isRetrieveDisabled}
          size="sm"
          className={cn(
            "flex h-full items-center hover:bg-accent",
            channelType === "amazon" && "rounded-r-none border-r-0 pr-1"
          )}
          onClick={handleRetrieveClick}
          disabled={isRetrieveDisabled}
        >
          {isRetrieveDisabled ? `Retrieve (${countdown}s)` : "Retrieve"}
        </Button>

        {channelType === "amazon" && (
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex h-full w-8 items-center justify-center rounded-l-none border-l px-0 hover:bg-accent"
            >
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
        )}
      </div>

      <DropdownMenuContent className="w-64 p-4" sideOffset={5}>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            retrieveButtonHandler(true);
          }}
        >
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter days ago"
            min="1"
            required
            className="h-8"
          />
          <Button type="submit" variant="default" size="sm">
            Submit
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
