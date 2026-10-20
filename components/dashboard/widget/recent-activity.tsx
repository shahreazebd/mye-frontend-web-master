import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import useGetActivityLogs from "@/hooks/queries/activity-log/useGetActivityLogs";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import ActivitiesLog from "./activities-log";

dayjs.extend(relativeTime);

export default function RecentActivity() {
  const { data, isLoading } = useGetActivityLogs(null, undefined, null);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Manage your report</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        {isLoading ? (
          <SkeletonLoader />
        ) : data && data.length > 0 ? (
          <ActivitiesLog />
        ) : (
          <NoDataPlaceholder title="No activity" />
        )}
      </CardContent>
    </Card>
  );
}
