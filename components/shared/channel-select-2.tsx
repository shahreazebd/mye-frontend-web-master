"use client";

import * as React from "react";
import type { Channel } from "@/schema/channel";
import { capitalizeFirstLetter, groupBy } from "@/utils/helpers";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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

type Props = {
  className?: string;
  filterByChannelTypes?: string[];
  showAllChannel?: boolean;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (data: Channel | null) => void;
  selectedDataCount?: number;
  dataCount?: number;
  setChannelDetails?: any;
};

type ChannelGroup = {
  key: string;
  values: Channel[];
};

export default function ChannelSelect2({
  filterByChannelTypes,
  className,
  showAllChannel = true,
  value,
  onValueChange,
  selectedDataCount,
  dataCount,
  setChannelDetails,
}: Readonly<Props>) {
  const { data: channels, isLoading } = useGetChannels();
  const [open, setOpen] = React.useState(false);
  const [channelId, setChannelId] = React.useState(value ?? "all");
  const [channelGroupState, setChannelGroupState] = React.useState([] as ChannelGroup[]);

  // Sync internal state when the external value changes (e.g., restored from URL on mount)
  React.useEffect(() => {
    if (value !== undefined && value !== channelId) {
      setChannelId(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  React.useEffect(() => {
    const channelGroup = groupBy(channels ?? [], (e) => e?.channel_type)
      .filter((group) => !filterByChannelTypes?.includes(group.key))
      .sort((a, b) => a.key.localeCompare(b.key))
      .filter((a) => a.values.length > 0);

    if (!showAllChannel) {
      if (channelGroup.length > 0) {
        setChannelDetails?.(channelGroup[0]?.values[0]);
      }
    }

    setChannelGroupState(channelGroup);
  }, [isLoading, filterByChannelTypes?.length]);

  const selectedChannel = channels?.find((channel) => channel.channel_uid === channelId);

  React.useEffect(() => {
    if (isLoading || !channels) return;
    onValueChange?.(selectedChannel || null);
  }, [selectedChannel, isLoading, channels]);

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
              <CommandInput placeholder="Search Channel..." />
              <CommandList>
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
                            if (setChannelDetails) {
                              setChannelDetails(channel);
                            }

                            setChannelId(channel.channel_uid);
                            setOpen(false);
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

                {showAllChannel ? (
                  <CommandGroup heading="All">
                    <CommandItem
                      value="all"
                      onSelect={() => {
                        setChannelId("all");
                        setOpen(false);
                      }}
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
                          selectedChannel?.channel_uid === ""
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  </CommandGroup>
                ) : (
                  ""
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </section>
  );
}
