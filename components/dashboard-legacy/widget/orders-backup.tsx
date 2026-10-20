import React, { useEffect } from "react";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useGetOrders from "@/hooks/queries/dashboard/use-get-orders";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

interface Data {
  date?: string;
  "Open Orders": number;
  Dispatched: number;
}

export default function Orders() {
  const [data, setData] = React.useState<Data[]>();
  const [maxData, setMaxData] = React.useState(0);
  // const { theme: mode } = useTheme();
  // const [config] = useConfig();
  const { data: orders, isLoading, isError } = useGetOrders("20");

  useEffect(() => {
    if (orders) {
      let maxOrder = 0;
      let maxDispatched = 0;
      const orderData = orders
        .map((order) => {
          if (maxOrder < order?.order) {
            maxOrder = order?.order;
          }

          if (maxDispatched < order?.dispatched) {
            maxDispatched = order?.dispatched;
          }
          return {
            date: order?.day,
            "Open Orders": order?.order,
            Dispatched: order?.dispatched,
          };
        })
        .sort((a, b) => {
          return dayjs(a?.date).unix() - dayjs(b?.date).unix();
        });

      setData(() => orderData);
      if (maxOrder > maxDispatched) {
        setMaxData(maxOrder + 100);
      } else {
        setMaxData(maxDispatched + 100);
      }
    }
  }, [orders]);

  let content;

  if (isLoading) {
    content = <SkeletonLoader count={7} />;
  } else if (isError) {
    content = <div className="mt-10 h-24 text-center">No results.</div>;
  } else {
    content = (
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              className="text-xs"
              dataKey={(data) => dayjs(data?.date).format("D MMM")}
            />
            <YAxis className="text-xs" domain={[0, maxData]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Open Orders
                          </span>
                          <span className="font-bold text-[#ee1e5f]">
                            {payload[0]?.value}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Dispatched
                          </span>
                          <span className="font-bold text-[#065089]">
                            {payload[1]?.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              }}
            />
            <Legend />
            <Bar dataKey="Open Orders" stackId="a" fill="#ee1e5f" />
            <Bar dataKey="Dispatched" stackId="a" fill="#065089" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          See your open orders and dispatched orders summary
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">{content}</CardContent>
    </Card>
  );
}
