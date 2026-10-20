import { io } from "socket.io-client";

export const socket = io("https://api.manageyourecommerce.com", {
  path: "/amazon/socket.io",
});

export const shipmentSocket = io("https://api.manageyourecommerce.com", {
  path: "/mps/socket.io",
});

// local
// export const newPostageSocket = io("https://82xp9lvq-9099.asse.devtunnels.ms", {
//   path: "/socket.io",
// });
