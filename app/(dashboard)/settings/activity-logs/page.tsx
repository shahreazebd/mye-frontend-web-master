import { Metadata } from "next";

import ActivityLogsWrapper from "@/components/activity-logs/activity-logs-wrapper";

export const metadata: Metadata = {
  title: "Activity Logs",
  description: "Hand-picked themes that you can copy and paste into your apps.",
};

export default function ActivityLogsPage() {
  return <ActivityLogsWrapper />;
}
