import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";

import useGetActivityLogs from "@/hooks/queries/activity-log/useGetActivityLogs";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ActivitiesLog() {
  const { data: activityLogs } = useGetActivityLogs(null, undefined, null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let arr = [];
    // @ts-ignore
    const activityByDate = Object.groupBy(activityLogs ?? [], ({ created_at }) =>
      dayjs(created_at?.$date).format("DD MMMM, YYYY")
    );

    for (const d in activityByDate) {
      arr.push({
        date: d,
        data: activityByDate[d],
      });
    }

    setData(arr as any);
  }, [activityLogs]);

  const today = dayjs().format("DD MMMM, YYYY");

  return (
    <div className="max-h-[280px] overflow-y-scroll">
      {data?.map((activityLog: any) => {
        return (
          <Fragment key={activityLog.date}>
            <p className="mb-2 mt-4 text-xs font-medium leading-none text-slate-800">
              {activityLog.date === today
                ? `Today: ${activityLog.date}`
                : activityLog.date}
            </p>
            <div className="pt-1">
              {activityLog?.data?.map((d: any) => {
                return (
                  <div key={d._id?.$oid} className="grid grid-cols-1 items-start">
                    {/* Item */}
                    <div className="flex gap-x-2">
                      {/* Icon */}
                      <div className="relative flex size-4 items-center justify-center">
                        <span
                          className={`flex size-4 shrink-0 items-center justify-center rounded-full ${
                            d.type === "dispatch_order"
                              ? "bg-[#047857]"
                              : d.type === "cancel_order"
                              ? "bg-[#ee1e5f]"
                              : "bg-[#fab512]"
                          } text-[10px] font-semibold uppercase text-white`}
                        >
                          {d.type === "dispatch_order" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5 shrink-0"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                          ) : d.type === "cancel_order" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5 shrink-0"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M8 12h8" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5 shrink-0"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                          )}
                        </span>
                      </div>
                      {/* End Icon */}

                      {/* Right Content */}
                      <div className="grow pb-4">
                        <p className="pb-0.5 text-xs text-gray-800">{d.data}</p>

                        {/*<p className="inline-flex items-center gap-x-1.5 text-xs text-muted-foreground">
                           <div className="shrink-0">
                            <Avatar className="h-3 w-3 shrink-0 rounded-full">
                              <AvatarImage src={d?.avatar_url} />
                              <AvatarFallback className="bg-slate-400 text-[10px] text-gray-800">
                                {d?.user?.slice(0, 1).toLocaleUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div> */}

                        <p className="text-[11px] font-normal leading-none text-gray-500">
                          {dayjs(d.created_at.$date).format("DD MMMM, YYYY") === today
                            ? dayjs(d.created_at.$date).fromNow()
                            : dayjs(d.created_at.$date).format("DD-MM-YY, hh:mma")}
                        </p>
                      </div>
                      {/* End Right Content */}
                    </div>
                    {/* End Item */}
                  </div>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
