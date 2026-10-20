"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { getCookie, setCookie } from "cookies-next";
import { X } from "lucide-react";

import { useGetSingleSubscription } from "@/hooks/queries/subscription/use-get-single-subscription";

export function DashboardAlert() {
  const { data: subscription } = useGetSingleSubscription();
  const [showUpgradeLinkAndRole, setShowUpgradeLinkAndRole] = useState(false);

  useEffect(() => {
    if (subscription?.id) {
      const isShown = getCookie("dashboardAlert") !== "false";

      if (isShown && subscription?.trialDaysLeft <= 7) {
        setShowUpgradeLinkAndRole(true);
      }
    }
  }, [subscription]);

  const handleClose = () => {
    setCookie("dashboardAlert", "false");
    setShowUpgradeLinkAndRole(false);
  };

  if (showUpgradeLinkAndRole) {
    return (
      <div className="flex items-center justify-between border-l-4 border-yellow-400 bg-yellow-100 p-4">
        <div className="flex">
          <ExclamationTriangleIcon
            className="size-5 text-yellow-400"
            aria-hidden="true"
          />

          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Your {subscription?.status === "SUBSCRIBED" ? "subscription" : "trial"} ends
              in {subscription?.trialDaysLeft} days.{" "}
              <Link
                href="/settings/subscription"
                className="font-medium text-yellow-700 underline hover:text-yellow-600"
              >
                Upgrade your account
              </Link>
            </p>
          </div>
        </div>

        <div>
          <button onClick={handleClose}>
            <X className="size-5 text-yellow-600" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return <></>;
}
