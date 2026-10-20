import React, { useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

import useGetStockSummery from "@/hooks/queries/dashboard/use-get-stock-summery";
import LocationSelect from "@/components/shared/location-select";

import { CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} fontSize={14}>
        {`${payload.name} stock`}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={fill} fontSize={14}>
        {payload.value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        fontSize={14}
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={fill}
        fontSize={13}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const COLORS = ["#6F6AF8", "#fab512", "#ee1e5f"];

export default function StockSummery() {
  const { data } = useGetStockSummery();
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: number, index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <CardHeader>
        <div className="flex flex-col justify-between xl:flex-row">
          <div className="xl:mb-2">
            <CardTitle>Stock Summary</CardTitle>
            <CardDescription>See your report depend on this</CardDescription>
          </div>

          <LocationSelect />
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data?.map((_, index) => (
                  <Cell
                    style={{ outline: "none" }}
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
}
