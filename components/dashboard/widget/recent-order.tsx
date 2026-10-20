import * as React from "react";
import { themes } from "@/registry/themes";
import { useTheme } from "next-themes";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

// import { useConfig } from "@/hooks/use-config"
import { useConfig } from "@/hooks/custom/use-config";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export default function RecentOrder() {
  const { theme: mode } = useTheme();
  const [config] = useConfig();

  const theme = themes.find((theme) => theme.name === config.theme);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: "var(--theme-primary)",
                      opacity: 0.2,
                      "--theme-primary": `hsl(${
                        theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                      })`,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
