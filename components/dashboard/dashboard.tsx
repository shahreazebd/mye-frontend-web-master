"use client";

import Link from "next/link";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";
import useGetChannels from "@/hooks/queries/channel/useGetChannels";

import Widget from "./widget";

dayjs.extend(isBetween);

export default function DashboardWrapper() {
  const { userInformation } = useAuth();

  const { data: channels } = useGetChannels();

  const today = dayjs().format("YYYY-MM-DD");

  const after10Day = dayjs().add(10, "day").format("YYYY-MM-DD");

  const status = channels
    ?.map((channel) => channel.expires_on)
    .filter(Boolean)
    .some((expiryDate) => {
      const date = dayjs(expiryDate).format("YYYY-MM-DD");

      return dayjs(date).isBetween(today, after10Day, "day", "[]");
    });

  return (
    <div className={cn("w-full pb-8")}>
      {status && (
        <div className="mb-5 block border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <div className="flex">
            <AlertTriangle className="size-5 text-yellow-400" aria-hidden="true" />

            <div className="ml-3">
              <div className="text-sm text-yellow-700">
                One of your channels almost reached the expiry.{" "}
                {["owner", "parent"].includes(userInformation?.type!) && (
                  <Link
                    href="/settings/all-channels"
                    className="font-medium text-yellow-700 underline hover:text-yellow-600"
                  >
                    Reconnect your channel.
                  </Link>
                )}
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-m-1.5">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <span className="sr-only">Dismiss</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Widget />
    </div>
  );
}
