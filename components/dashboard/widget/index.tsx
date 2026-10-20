import { getInitials } from "@/utils/helpers";

import useAuth from "@/hooks/custom/useAuth";

import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Card } from "../../ui/card";
import ChannelExpiration from "./channel-expiration";
import MaxOrderChannel from "./max-order-channel";
import OrderOverview from "./order-overview";
import Orders from "./orders";
import RecentActivity from "./recent-activity";
import StockSummaryBarCharts from "./stock-summary-bar-charts";
import TopSellingProducts from "./top-selling-products";
import TopSellingToday from "./top-selling-today";
import { TotalPurchasedPostages } from "./total-purchased-postages";

export default function Widget() {
  const { userInformation } = useAuth();
  return (
    <div className="pt-5">
      <div className="hidden xl:fixed xl:flex xl:w-96 xl:flex-col">
        <Card>
          <OrderOverview />
          <StockSummaryBarCharts />
          <TopSellingProducts />
        </Card>
      </div>
      <div className="xl:pl-96">
        <main className="pl-8">
          <div className="flex items-center gap-2 rounded-full pb-7">
            <Avatar className="size-10">
              <AvatarFallback>{getInitials(userInformation?.Name ?? "")}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-left text-sm font-medium leading-none">
                <span className="text-lg font-semibold text-slate-800">
                  Howdy, {userInformation?.Name}
                </span>
              </p>
              <p className="text-left text-xs leading-none text-gray-500">Good Morning</p>
            </div>
          </div>
          <div className="grid gap-10">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-6 xl:col-span-7 2xl:col-span-8">
                <Orders />
              </div>

              <div className="col-span-12 lg:col-span-6 xl:col-span-5 2xl:col-span-4">
                <RecentActivity />
              </div>

              <div className="col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-7">
                <TopSellingToday />
              </div>

              <div className="col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-5">
                <TotalPurchasedPostages />
              </div>

              <div className="col-span-12 lg:col-span-6 xl:col-span-5 2xl:col-span-4">
                <ChannelExpiration />
              </div>

              <div className=" col-span-12 lg:col-span-6 xl:col-span-7 2xl:col-span-4">
                <MaxOrderChannel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
