import { useState } from "react";
import dayjs from "dayjs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useGetPostageDailyStats from "@/hooks/queries/dashboard/use-get-postage-daily-stats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export function TotalPurchasedPostages() {
  const [days, setDays] = useState<number>(7);
  const { data: response, isLoading, isError } = useGetPostageDailyStats(days);

  function handleChange(value: string) {
    setDays(Number(value));
  }

  const seriesData = response?.data?.series || [];

  // Format data for chart
  const chartData = seriesData.map((item) => ({
    date: dayjs(item.date).format("D MMM"),
    count: item.count,
  }));

  const hasData = chartData.some((item) => item.count > 0);

  let content;

  if (isLoading) {
    content = <SkeletonLoader count={5} />;
  } else if (isError) {
    content = (
      <div className="mt-10 h-24 text-center text-sm text-red-500">
        Failed to load statistics.
      </div>
    );
  } else if (!hasData) {
    content = <NoDataPlaceholder title="No postage purchased yet" />;
  } else {
    content = (
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -25,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6F6AF8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6F6AF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" vertical={false} />
            <XAxis
              className="text-xs text-gray-500"
              dataKey="date"
              tickLine={false}
              axisLine={false}
            />
            <YAxis className="text-xs text-gray-500" tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 text-center shadow-sm">
                      <p className="text-xs uppercase text-muted-foreground">
                        {payload[0]?.payload?.date}
                      </p>
                      <p className="font-bold text-[#1E2024]">{payload[0]?.value}</p>
                      <p className="text-xs text-muted-foreground">Postages Purchased</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6F6AF8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 xl:flex-row">
          <div>
            <CardTitle>Total Purchased Postages</CardTitle>
            <CardDescription>Successfully purchased postages overview</CardDescription>
          </div>

          <Select onValueChange={handleChange} defaultValue="7">
            <SelectTrigger className="h-8 w-auto">
              <SelectValue placeholder="Select Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="h-full min-h-[240px]">{content}</CardContent>
    </Card>
  );
}
