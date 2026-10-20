import React, { useEffect } from "react";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useGetOrders from "@/hooks/queries/dashboard/use-get-orders";
import { NoDataPlaceholder } from "@/components/core/no-data-placeholder";
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
  const { data: orders, isLoading, isError } = useGetOrders("30");

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
      setMaxData(maxOrder + 100);
    }
  }, [orders]);

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill={props?.value === maxData - 100 ? "#666" : "#999"}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {props?.value}
        </text>
      </g>
    );
  };

  let content;

  if (isLoading) {
    content = <SkeletonLoader count={7} />;
  } else if (isError) {
    content = <div className="mt-10 h-24 text-center">No results.</div>;
  } else {
    content = (
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              left: -25,
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
                    <div className="rounded-lg border bg-background p-2 text-center shadow-sm">
                      <p className="text-xs uppercase text-muted-foreground">
                        {dayjs(payload[0]?.payload?.date).format("D MMM YYYY")}
                      </p>
                      {payload[0]?.value === maxData - 100 ? (
                        <p className="font-bold text-newPrimary">{payload[0]?.value}</p>
                      ) : (
                        <p className="font-bold text-[#1E2024]">{payload[0]?.value}</p>
                      )}

                      <p className="text-xs text-muted-foreground">Open Orders</p>
                    </div>
                  );
                } else {
                  return null;
                }
              }}
            />
            {/* <Legend /> */}

            <Bar
              className="text-xs"
              dataKey="Open Orders"
              fill="#1E2024"
              radius={[5, 5, 0, 0]}
            >
              <LabelList dataKey="Open Orders" content={renderCustomizedLabel} />
              {data?.map((entry, index) => (
                <Cell
                  fill={entry["Open Orders"] === maxData - 100 ? "#6F6AF8" : "#1E2024"}
                  key={index}
                />
              ))}
            </Bar>
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
      <CardContent className="h-full">
        {orders && orders?.length === 0 ? (
          <NoDataPlaceholder title="No order found" />
        ) : (
          content
        )}
      </CardContent>
    </Card>
  );
}
