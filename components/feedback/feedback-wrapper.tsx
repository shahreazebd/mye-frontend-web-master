"use client";

import { useState } from "react";
import { Channel } from "@/schema/channel";

import useGetEbayFeedbackStats from "@/hooks/queries/ebay-feedback/useGetEbayFeedbackStats";
import useGetEbayFeedbacks from "@/hooks/queries/ebay-feedback/useGetEbayFeedbacks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DataTable } from "../core/data-table/data-table";
import ChannelSelect2 from "../shared/channel-select-2";
import { columns } from "./feedback-column";

export default function FeedbackWrapper() {
  const filters = {
    feedbackQ: "",
    feedbackStatus: "",
    feedbackPeriod: "",
  };
  const [channelDetails, setChannelDetails] = useState({} as Channel | null);

  const { data, isLoading } = useGetEbayFeedbacks(filters);
  const { data: stats } = useGetEbayFeedbackStats(channelDetails?.channel_uid as string);

  const components = (
    <>
      <Select>
        <SelectTrigger className="h-8 w-[200px]">
          <SelectValue placeholder="Select a type of rating:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">ALL</SelectItem>
            <SelectItem value="Positive">Positive</SelectItem>
            <SelectItem value="Neutral">Neutral</SelectItem>
            <SelectItem value="Negative">Negative</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder="Select a period:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <ChannelSelect2
        setChannelDetails={setChannelDetails}
        filterByChannelTypes={["ebay"]}
        showAllChannel={false}
      />
    </>
  );

  const card = (
    <div className="flex items-center justify-end">
      <div className="px-5 py-2 text-center">
        <h6 className="text-sm">Total Review</h6>
        <h4 className="my-2">{stats?.data?.percentage?.one_year_positive_count}</h4>
        <p className="text-sm text-muted-foreground">Review Growth In this Year</p>
      </div>

      <div className="border-l px-5 py-2 text-center">
        <h6 className="text-sm">Total Positive Review</h6>
        <h4 className="my-2">{stats?.data?.response_format[0]?.month?.twelve}</h4>
        <p className="text-sm text-muted-foreground">Review Growth In this Year</p>
      </div>

      <div className="border-l px-5 py-2 text-center">
        <h6 className="text-sm">Total Normal Review</h6>
        <h4 className="my-2">{stats?.data?.response_format[1]?.month?.twelve}</h4>
        <p className="text-sm text-muted-foreground">Review Growth In this Year</p>
      </div>

      <div className="border-l px-5 py-2 text-center">
        <h6 className="text-sm">Total Negative Review</h6>
        <h4 className="my-2">{stats?.data?.response_format[2]?.month?.twelve}</h4>
        <p className="text-sm text-muted-foreground">Review Growth In this Year</p>
      </div>
    </div>
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        title="Feedback"
        description="Manage All Feedback"
        search={false}
        searchColumn="feedback_details.CommentingUser"
        searchPlaceholder="Search user name"
        tableHeader={false}
        loading={isLoading}
        component={components}
        key="_id"
        className="border-0"
        tableRowClass="block border mb-3 py-3 px-3 rounded-md"
        dataSize={7}
        pageOptions={[7, 10, 15, 20]}
        card={card}
      />
    </div>
  );
}
