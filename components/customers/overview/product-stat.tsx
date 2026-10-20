"use client";

import { useParams, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useGetCustomerDetails } from "@/hooks/queries/customers/use-get-customer-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CustomTooltip({ active, payload }: any) {
  if (active && payload?.length) {
    // console.log(payload);

    return (
      <div className="rounded-lg border bg-background p-2 text-center shadow-sm">
        <p className="text-xs text-muted-foreground">{payload[0]?.payload?.date}</p>

        <p className="text-xs text-muted-foreground">
          Total ordered{" "}
          <span className="text-base font-bold text-newPrimary">
            {payload[0]?.payload?.totalOrders}
          </span>{" "}
          item(s)
          {/* at {payload[0]?.payload?.time} */}
        </p>
      </div>
    );
  }
  return null;
}

export function ProductsStatistics() {
  const searchParams = useSearchParams();
  const urlParams = useParams();

  const { data: customerDetails } = useGetCustomerDetails(
    decodeURI(urlParams.slug as string),
    searchParams.get("phone") as string
  );

  const graphData = customerDetails?.data?.order_details
    .map((e) => {
      const time = +dayjs(e.purchase_date).format("hh");
      const date = dayjs(e.purchase_date).format("DD MMM YYYY");

      const totalOrders = e.order_items.reduce((acc, cur) => acc + cur.quantity, 0);

      return {
        time,
        date,
        totalOrders,
      };
    })
    .slice(0, 10);

  return (
    <Card className="w-5/12">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">Products Statistics</CardTitle>
      </CardHeader>

      <CardContent>
        <div style={{ width: "100%" }}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              className="text-xs text-slate-500"
              width={500}
              height={260}
              data={graphData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />

              <YAxis
                tickFormatter={(e) => {
                  return dayjs().hour(e).format("hh a");
                }}
              />
              <Tooltip
                content={<CustomTooltip active={false} payload={[]} label={""} />}
              />
              <Line
                connectNulls
                type="monotone"
                dataKey="time"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
