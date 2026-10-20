"use client";

import { ReactNode, useEffect, useState } from "react";

import { shipmentSocket } from "@/lib/socket";

type Props = {
  children: ReactNode;
};

export function ShipmentSocketProvider(props: Readonly<Props>) {
  // eslint-disable-next-line no-unused-vars
  const [isConnected, setIsConnected] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (shipmentSocket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(shipmentSocket.io.engine.transport.name);

      shipmentSocket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    shipmentSocket.on("connect", onConnect);
    shipmentSocket.on("disconnect", onDisconnect);

    return () => {
      shipmentSocket.off("connect", onConnect);
      shipmentSocket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <div>
      {/* <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p> */}

      {props.children}
    </div>
  );
}
