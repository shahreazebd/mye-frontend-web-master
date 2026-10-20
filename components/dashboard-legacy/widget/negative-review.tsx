import Image from "next/image";

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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export interface Channel {
  id: number;
  name: string;
  logo: string;
  description: string;
}

export default function NegativeReview() {
  const channelsData: Channel[] = [
    {
      id: 1,
      name: "M-HP-NVY-40-SB05",
      logo: "/logos/marketplaces/round/amazon.svg",
      description: " Product’s quality was really bad & Packaging also was in bad shape.",
    },
    {
      id: 2,
      name: "Ebay",
      logo: "/logos/marketplaces/round/ebay.svg",
      description: " Product’s quality was really bad & Packaging also was in bad shape.",
    },

    {
      id: 3,
      name: "Shopify",
      logo: "/logos/marketplaces/round/shopify.svg",
      description: " Product’s quality was really bad & Packaging also was in bad shape.",
    },
    {
      id: 4,
      name: "Otto",
      logo: "/logos/marketplaces/round/otto.svg",
      description: " Product’s quality was really bad & Packaging also was in bad shape.",
    },
    {
      id: 5,
      name: "WooCommerce",
      logo: "/logos/marketplaces/round/woocommerce.svg",
      description: " Product’s quality was really bad & Packaging also was in bad shape.",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Negative Reviews</CardTitle>
        <CardDescription>Manage your report depend on this</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <Command>
          <CommandInput
            className="my-4 rounded-lg border"
            placeholder="Type a channel type to search..."
          />
          <CommandList className="max-h-[250px]">
            <ScrollArea className="h-[250px] pr-2">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {channelsData.map((channel) => (
                  <div key={channel.id}>
                    <CommandItem className="grid grid-cols-8 gap-5 py-4 aria-selected:bg-transparent">
                      <div>
                        <Image
                          height={40}
                          width={40}
                          // className="h-10 w-10 rounded-full"
                          src={channel.logo}
                          alt={channel.name}
                        />
                      </div>
                      <div className="col-span-5 mr-2">
                        <span className="font-semibold">M-HP-NVY-40-SB05</span>
                        <p className="mt-2 w-full text-sm">{channel.description}</p>
                      </div>
                      <div className="col-span-2">
                        <Button size="sm" variant="default" className="w-full text-xs">
                          Take Action
                        </Button>
                      </div>
                    </CommandItem>
                    {channel.id !== channelsData.length && <CommandSeparator />}
                  </div>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}
