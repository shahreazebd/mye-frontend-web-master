import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import useGetStockSummery from "@/hooks/queries/dashboard/use-get-stock-summery";
import LocationSelect from "@/components/shared/location-select";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

const COLORS = ["#065089", "#fab512", "#ee1e5f"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      className="text-sm font-bold"
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function StockSummery() {
  const { data } = useGetStockSummery();

  return (
    <Card className=" h-full">
      <CardHeader>
        <div className="flex flex-col justify-between 2xl:flex-row">
          <div className="xl:mb-2">
            <CardTitle>Stock Summary</CardTitle>
            <CardDescription>See your report depend on this</CardDescription>
          </div>

          <LocationSelect />
        </div>
      </CardHeader>
      <CardContent className=" h-full">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={700} height={400}>
              <Pie
                stroke="none"
                data={data}
                cx="50%"
                cy="50%"
                // innerRadius={60}
                outerRadius={90}
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="value"
              >
                {data?.map((_, index) => (
                  <Cell
                    style={{ outline: "none" }}
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0]?.payload?.name}
                          </span>
                          <span className="text-center font-bold">
                            {payload[0]?.value}
                          </span>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
