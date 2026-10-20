"use client";

import { ReactNode, useEffect, useState } from "react";

import { socket } from "@/lib/socket";

type Props = {
  children: ReactNode;
};

export function SocketProvider(props: Props) {
  // eslint-disable-next-line no-unused-vars
  const [isConnected, setIsConnected] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
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
