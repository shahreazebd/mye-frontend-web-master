"use client";

import { usePostageAtom } from "@/atoms/postageAtom";

import { DatePicker } from "../day-picker";
import ChannelSelect from "../shared/channel-select";

export function PostageFilters() {
  const { postageInfo, setPostageInfo } = usePostageAtom();

  return (
    <div className="flex gap-4">
      <ChannelSelect
        onValueChange={(value) => {
          setPostageInfo((prev) => {
            return {
              ...prev,
              filters: {
                ...prev.filters,
                channelUuid: (value?.channel_uid as string) || "all",
              },
            };
          });
        }}
      />

      <DatePicker
        className="w-64"
        date={postageInfo.filters.date}
        setDate={(value) => {
          setPostageInfo((prev) => {
            return {
              ...prev,
              filters: {
                ...prev.filters,
                date: value as Date,
              },
            };
          });
        }}
      />
    </div>
  );
}
