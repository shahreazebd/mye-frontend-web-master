import useAuth from "@/hooks/custom/useAuth";

import ChannelExpiration from "./channel-expiration";
import MaxOrderChannel from "./max-order-channel";
import OrderTopAccounts from "./order-top-accounts";
import Orders from "./orders";
import RecentActivity from "./recent-activity";
import StockSummary from "./stock-summary";
import Tasks from "./tasks";
import TopSellingProducts from "./top-selling-products";
import TopSellingToday from "./top-selling-today";

export default function Widget() {
  const { userInformation } = useAuth();

  return (
    <>
      {["owner", "parent"].includes(userInformation?.type!) ? (
        <div className="grid gap-10">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-8 xl:col-span-5">
              <Orders />
            </div>

            <div className="col-span-12 lg:col-span-4 xl:col-span-3"></div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-4">
              <RecentActivity />
            </div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-4">=</div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-5">
              <TopSellingToday />
            </div>

            <div className=" col-span-12 lg:col-span-6 xl:col-span-3">
              <StockSummary />
            </div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-4">
              <ChannelExpiration />
            </div>

            <div className=" col-span-12 lg:col-span-6 xl:col-span-4">
              <TopSellingProducts />
            </div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-4">
              <MaxOrderChannel />
            </div>
          </div>
        </div>
      ) : (
        <section className="grid gap-8">
          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-12 xl:col-span-9">
              <Orders />
            </div>

            <div className="col-span-12 xl:col-span-3"></div>
          </section>

          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-12 xl:col-span-4">
              <Tasks />
            </div>

            <div className="col-span-12 xl:col-span-3">
              <StockSummary />
            </div>

            <div className="col-span-12 xl:col-span-5">
              <RecentActivity />
            </div>
          </section>

          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <ChannelExpiration />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <OrderTopAccounts />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <TopSellingProducts />
            </div>
          </section>
        </section>
      )}
    </>
  );
}
