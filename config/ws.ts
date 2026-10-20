/* eslint-disable no-console */

export const isBrowser = typeof window !== "undefined";

export const ws = new WebSocket("wss://api.evidentbd.com/notification/notification/");

ws.onopen = () => {
  console.log("Connection Established!");
};

ws.onclose = () => {
  console.log("Connection Closed!");
  //initWebsocket();
};

ws.onerror = () => {
  console.log("WS Error");
};
