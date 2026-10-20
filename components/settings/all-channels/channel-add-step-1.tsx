"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, SquareArrowOutUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Channel {
  id: number;
  name: string;
  logo: string;
  description: string;
  href: string;
}

interface Props {
  nextStep: (channel: Channel) => void;
  step: number;
}

export default function ChannelAddStep1({ nextStep, step }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const channelsData: Channel[] = [
    {
      id: 1,
      name: "Amazon",
      logo: "/logos/marketplaces/amazon.svg",
      description: "Amazon an American multi national technology company",
      href: "/integrations/channels/amazon",
    },
    {
      id: 2,
      name: "Ebay",
      logo: "/logos/marketplaces/ebay.svg",
      description: "Ebay is an American multi national e-commerce corporation based.",
      href: "/integrations/channels/ebay",
    },
    {
      id: 3,
      name: "Shopify",
      logo: "/logos/marketplaces/shopify.svg",
      description: "Shopify is a Canadian multi national e-commerce company.",
      href: "/integrations/channels/shopify",
    },
    {
      id: 4,
      name: "Otto",
      logo: "/logos/marketplaces/otto.svg",
      description: "Otto is a German multi national e-commerce company.",
      href: "/integrations/channels/otto",
    },
    {
      id: 5,
      name: "WooCommerce",
      logo: "/logos/marketplaces/woocommerce.svg",
      description: "WooCommerce is an open-source e-commerce plugin for WordPress.",
      href: "/integrations/channels/woocommerce",
    },
    {
      id: 6,
      name: "Walmart",
      logo: "/logos/marketplaces/walmart.svg",
      description: "Walmart is an American multinational retail corporation.",
      href: "/integrations/channels/walmart",
    },
    {
      id: 7,
      name: "TikTok",
      logo: "/logos/marketplaces/tiktok.svg",
      description: "TikTok Shop is an innovative e-commerce solution for selling.",
      href: "/integrations/channels/tiktok",
    },
  ];

  const matches = (channel: Channel) =>
    channel.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

  // ids of items that are currently visible (preserves original order)
  const visibleIds = channelsData.filter(matches).map((c) => c.id);
  const hasMatches = visibleIds.length > 0;

  return (
    <div className="p-2">
      <h1 className="text-lg font-semibold">Add Channel</h1>
      <p className="mt-1 text-sm">To Add New Channel Select a Market Place</p>

      <Command>
        <CommandInput
          className="my-4 rounded-lg border"
          placeholder="Type a channel name to search..."
          onValueChange={setSearchTerm}
        />

        <CommandList className="max-h-[500px]">
          <ScrollArea className="h-[500px] pr-2">
            {!hasMatches ? <CommandEmpty>No results found.</CommandEmpty> : null}

            <CommandGroup>
              {channelsData.map((channel, idx) => {
                const isVisible = visibleIds.includes(channel.id);
                // render in original order but hide non-matching items
                return (
                  <div
                    key={channel.id}
                    // hide non-matching items but keep DOM order stable
                    className={isVisible ? "" : "hidden"}
                  >
                    <CommandItem className="grid grid-cols-10 gap-5 py-4 aria-selected:bg-transparent">
                      <div className="col-span-2 mr-6 flex items-center gap-4">
                        {/* serial always based on original index */}
                        <strong>{idx + 1}</strong>
                        <Image
                          height={20}
                          width={80}
                          src={channel.logo}
                          alt={channel.name}
                        />
                      </div>

                      <div className="col-span-5 mr-4">
                        <span className="font-semibold">Connect With {channel.name}</span>
                        <p className="mt-2 w-full text-sm">{channel.description}</p>
                      </div>

                      <div className="col-span-3 flex flex-col items-center justify-center gap-0.5">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => nextStep(channel)}
                          className="w-full"
                        >
                          Integrate
                          <span className="ml-2">
                            <MoveRight size={12} />
                          </span>
                        </Button>

                        <Link
                          className="text-bg-primary mt-1.5 flex items-center gap-0.5 text-xs font-medium hover:text-blue-700"
                          target="_blank"
                          href={channel.href}
                        >
                          Integration Guide
                          <SquareArrowOutUpRightIcon className="size-3" />
                        </Link>
                      </div>
                    </CommandItem>

                    {/* show separator only if this visible item is not the last visible one */}
                    {isVisible && channel.id !== visibleIds[visibleIds.length - 1] && (
                      <CommandSeparator />
                    )}
                  </div>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </Command>
    </div>
  );
}
