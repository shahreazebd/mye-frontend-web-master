import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import useGetActivityLogs from "@/hooks/queries/activity-log/useGetActivityLogs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import ActivitiesLog from "./activities-log";

dayjs.extend(relativeTime);

export default function RecentActivity() {
  const { isLoading } = useGetActivityLogs(null, undefined, null);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Manage your report</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <CardContent className="p-0">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <ActivitiesLog />
            </>
          )}
        </CardContent>
      </CardContent>
    </Card>
  );
}
