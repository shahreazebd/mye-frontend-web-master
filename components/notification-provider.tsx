"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { ws } from "@/config/ws";
import useAuth from "@/hooks/custom/useAuth";

type Props = {
  children: ReactNode;
};
export function NotificationProvider(props: Props) {
  const queryClient = useQueryClient();
  const { userInformation } = useAuth();

  function initWebsocket() {
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      if (newData?.company_uid === userInformation?.company_uid) {
        queryClient.invalidateQueries(["fetch-activity-logs"]);
        // console.log(newData);

        sendNotification({ body: newData.data, title: "Manage Your E-commerce" });
      }
    };
  }

  function sendNotification({ title, body }: { title: string; body: string }) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: "/mye-logo.svg",
        badge: "/mye-logo.svg",
      });
    }
  }

  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  useEffect(() => {
    initWebsocket();

    return () => {
      ws.close();
    };
  }, []);

  return (
    <section>
      {/* <button
        onClick={() => {
          // sendNotification({ body: "sa", title: "ss" });
          requestNotificationPermission();
        }}
      >
        send
      </button> */}
      {props.children}
    </section>
  );
}
