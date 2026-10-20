"use client";

import * as React from "react";
import { channelAtom } from "@/atoms/channelAtom";
import type { Channel } from "@/schema/channel";
import { capitalizeFirstLetter, groupBy } from "@/utils/helpers";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";

import { cn } from "@/lib/utils";
import useGetChannels from "@/hooks/queries/channel/useGetChannels";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  className?: string;
  channelType?: string;
  isAllChannel?: boolean;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (data: Channel | null) => void;
  selectedDataCount?: number;
  dataCount?: number;
};

type ChannelGroup = {
  key: string;
  values: Channel[];
};

export default function ChannelSelect({
  channelType,
  className,
  isAllChannel = true,
  onValueChange,
  selectedDataCount,
  dataCount,
}: Readonly<Props>) {
  const { data, isLoading } = useGetChannels();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useAtom(channelAtom);
  const [channelGroupState, setChannelGroupState] = React.useState([] as ChannelGroup[]);

  React.useEffect(() => {
    const channelGroup = groupBy(data ?? [], (e) => e?.channel_type)
      ?.map((a) => {
        return {
          ...a,
          values: a.values.filter((b) => {
            if (channelType === "" || channelType === undefined) {
              return b;
            } else {
              return b.channel_type === channelType;
            }
          }),
        };
      })
      .sort((a, b) => a.key.localeCompare(b.key))
      .filter((a) => a.values.length > 0);

    if (!isAllChannel) {
      if (channelGroup.length > 0) {
        setValue((prev) => {
          return {
            ...prev,
            uuid: channelGroup[0]?.values[0]?.channel_uid,
            channelDetails: channelGroup[0]?.values[0],
          };
        });
      }
    }

    setChannelGroupState(channelGroup);
  }, [isLoading, channelType]);

  function handelChannelSelect(channel: Channel | null) {
    if (channel) {
      onValueChange?.(channel);
    } else {
      onValueChange?.(null);
    }

    setValue((prev) => {
      return {
        ...prev,
        uuid: channel?.channel_uid || "",
        channelDetails: channel,
      };
    });

    setOpen(false);
  }

  const selectedChannel = data?.find((channel) => channel.channel_uid === value.uuid);

  return (
    <section>
      {isLoading ? (
        ""
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a channel"
              className={cn("h-8 w-auto justify-between px-2 lg:px-3", className)}
            >
              {selectedChannel?.channel_type && (
                <Avatar className="mr-2 size-5">
                  <AvatarImage
                    src={`/logos/marketplaces/round/${selectedChannel.channel_type}.svg`}
                    alt={selectedChannel.name}
                  />
                </Avatar>
              )}

              <span>{selectedChannel?.name || "All Channels"}</span>

              <div className="ml-5 flex items-center">
                {!dataCount ? (
                  ""
                ) : (
                  <span className="mr-2 text-sm">
                    ({selectedDataCount ? `${selectedDataCount} out of ` : ""}
                    {dataCount})
                  </span>
                )}

                <CaretSortIcon className="size-4 shrink-0 opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-2">
            <Command>
              <CommandInput placeholder="Search channel..." />
              <CommandList>
                <ScrollArea className="h-72">
                  <CommandEmpty>No channel found.</CommandEmpty>

                  {channelGroupState.map((c, i) => {
                    return (
                      <CommandGroup
                        key={i}
                        heading={capitalizeFirstLetter(c.key)}
                        defaultValue={channelGroupState[0]?.values[0]?.channel_uid}
                      >
                        {c.values.map((channel, i) => (
                          <CommandItem
                            key={i}
                            value={channel.name}
                            onSelect={() => {
                              handelChannelSelect(channel);
                            }}
                            className="mr-3 text-sm"
                          >
                            <Avatar className="mr-2 size-5">
                              <AvatarImage
                                src={`/logos/marketplaces/round/${channel.channel_type}.svg`}
                                alt={channel.name}
                                className="grayscale"
                              />
                              <AvatarFallback>{channel.name}</AvatarFallback>
                            </Avatar>
                            <span>{channel.name}</span>
                            <CheckIcon
                              className={cn(
                                "ml-auto size-4",
                                channel.channel_uid === selectedChannel?.channel_uid
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })}

                  {isAllChannel ? (
                    <CommandGroup heading="All">
                      <CommandItem
                        value=""
                        onSelect={() => handelChannelSelect(null)}
                        className="mr-3 text-sm"
                      >
                        <Avatar className="mr-2 size-5">
                          <AvatarImage alt="" className="grayscale" />
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <span>All Channels</span>
                        <CheckIcon
                          className={cn(
                            "ml-auto size-4",
                            value.uuid === "" ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    </CommandGroup>
                  ) : (
                    ""
                  )}
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </section>
  );
}
