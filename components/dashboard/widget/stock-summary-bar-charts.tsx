// components/HorizontalStackedBarChart.tsx

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import useGetStockSummery from "@/hooks/queries/dashboard/use-get-stock-summery";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationSelect from "@/components/shared/location-select";
import SkeletonLoader from "@/components/shared/skeleton-loader";

interface StockData {
  name: string;
  value: number;
}

interface NormalizedData {
  name: string;
  Safe: number;
  SafeValue: number;
  Warning: number;
  WarningValue: number;
  Zero: number;
  ZeroValue: number;
}

const StockSummaryBarCharts: React.FC = () => {
  const { data, isLoading } = useGetStockSummery();

  // Ensure data is an array and is properly typed
  const stockData = (data as StockData[]) || [];

  const totalValue = stockData.reduce((acc, item) => acc + item.value, 0);

  const normalizedData: NormalizedData[] = [
    {
      name: "Stock",
      Safe:
        ((stockData.find((item) => item.name === "Safe")?.value ?? 0) / totalValue) *
          100 || 0,
      SafeValue: stockData.find((item) => item.name === "Safe")?.value ?? 0,
      Warning:
        ((stockData.find((item) => item.name === "Warning")?.value ?? 0) / totalValue) *
          100 || 0,
      WarningValue: stockData.find((item) => item.name === "Warning")?.value ?? 0,
      Zero:
        ((stockData.find((item) => item.name === "Zero")?.value ?? 0) / totalValue) *
          100 || 0,
      ZeroValue: stockData.find((item) => item.name === "Zero")?.value ?? 0,
    },
  ];
  const tickFormatter = (tick: number) => `${tick}%`;

  const customTooltip = ({ payload, label, active }: TooltipProps<number, string>) => {
    if (active && payload?.length) {
      return (
        <div className="rounded-lg border bg-white p-4">
          <p className="label">{`${label}`}</p>
          {payload.map((item) => (
            <p key={item.dataKey} style={{ color: item.color, fontSize: "14px" }}>
              {`${item.name}: ${item.value?.toFixed(2)}% (${
                item.payload[item.dataKey + "Value"]
              })`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <CardHeader className="pb-5">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div>
            <CardTitle>Stock Summary</CardTitle>
            <CardDescription>See your report depend on this</CardDescription>
          </div>

          <LocationSelect />
        </div>
      </CardHeader>
      <CardContent className="h-full">
        {isLoading ? (
          <SkeletonLoader count={1} />
        ) : (
          <div>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart
                layout="vertical"
                width={500}
                height={100}
                data={normalizedData}
                margin={{
                  top: 5,
                  right: 0,
                  left: -50,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  className="text-xs"
                  type="number"
                  tickFormatter={tickFormatter}
                  domain={[0, 100]}
                />
                <YAxis type="category" dataKey="name" className="hidden" />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar dataKey="Safe" stackId="a" fill="#6F6AF8" />
                <Bar dataKey="Warning" stackId="a" fill="#fab512" />
                <Bar dataKey="Zero" stackId="a" fill="#ee1e5f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </>
  );
};

export default StockSummaryBarCharts;
