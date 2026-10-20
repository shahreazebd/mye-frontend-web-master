import { Dot } from "lucide-react";

import { useGetTodayOrderStatistics } from "@/hooks/queries/dashboard/use-get-today-order-statistics";
import SkeletonLoader from "@/components/shared/skeleton-loader";

import { CardContent, CardHeader, CardTitle } from "../../ui/card";

export default function OrderOverview() {
  const { data, isLoading } = useGetTodayOrderStatistics();

  function percentage(percentage: number) {
    return Math.abs(Math.round(percentage ?? 0));
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Happening Today</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <SkeletonLoader count={5} />
        ) : (
          <div className="flex gap-3.5">
            <div className="w-full rounded-lg bg-sky-400/30 p-3 md:w-1/3">
              <div className="flex items-center">
                <Dot className="-mx-1.5 text-newPrimary" />

                <div className="text-xs font-medium tracking-tight text-slate-950">
                  Total Order
                </div>
              </div>
              <div className="flex items-baseline pl-1.5">
                <div className="mt-3 text-2xl font-semibold tracking-tight text-black">
                  {data?.total_order}
                </div>
                <div className="ml-0.5 text-xs font-normal tracking-tight text-black opacity-50">
                  {percentage(data?.total_order_percentage ?? 0)}%
                </div>
              </div>
              <div className="pl-2 text-xs font-normal tracking-tight text-black opacity-50">
                Today
              </div>
            </div>

            <div className="w-full rounded-lg bg-green-500/30 p-3 md:w-1/3">
              <div className="flex items-center">
                <Dot className="-mx-1.5 text-green-600" />

                <div className="text-xs font-medium tracking-tight text-slate-950">
                  To Dispatch
                </div>
              </div>
              <div className="flex items-baseline pl-1.5">
                <div className="mt-3 text-2xl font-semibold tracking-tight text-black">
                  {data?.to_dipatch}
                </div>
                <div className="ml-0.5 text-xs font-normal tracking-tight text-black opacity-50">
                  {percentage(data?.to_dispatch_percentage ?? 0)}%
                </div>
              </div>
              <div className="pl-2 text-xs font-normal tracking-tight text-black opacity-50">
                Today
              </div>
            </div>

            <div className="w-full rounded-lg bg-orange-500/30 p-3 md:w-1/3">
              <div className="flex items-center">
                <Dot className="-mx-1.5 text-orange-600" />

                <div className="text-xs font-medium tracking-tight text-slate-950">
                  Dispatched
                </div>
              </div>
              <div className="flex items-baseline pl-1.5">
                <div className="mt-3 text-2xl font-semibold tracking-tight text-black">
                  {data?.dispatched}
                </div>
                <div className="ml-0.5 text-xs font-normal tracking-tight text-black opacity-50">
                  {percentage(data?.dispatched_percentage ?? 0)}%
                </div>
              </div>
              <div className="pl-2 text-xs font-normal tracking-tight text-black opacity-50">
                Today
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </>
  );
}
