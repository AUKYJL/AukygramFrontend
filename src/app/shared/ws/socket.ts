"use client";

import { Socket, io } from "socket.io-client";

import { ACCESS_TOKEN, BASE_API_URL, BASE_WS_URL } from "../consts/consts";

let socket: Socket | null = null;

const createSocket = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const newSocket = io(`${BASE_WS_URL}/chat`, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  newSocket.on("connect_error", async (err: any) => {
    if (err.message === "Unauthorized") {
      try {
        const response = await fetch(`${BASE_API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          const { accessToken } = await response.json();

          localStorage.setItem(ACCESS_TOKEN, accessToken);
          newSocket.auth = { token: `Bearer ${accessToken}` };
          newSocket.disconnect();
          newSocket.connect();
        } else {
          localStorage.removeItem(ACCESS_TOKEN);
          window.location.href = "/login";
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = "/login";
      }
    } else {
      console.error("Socket connection error:", err);
    }
  });

  return newSocket;
};

export const getSocket = () => {
  if (!socket) {
    socket = createSocket();
  }
  return socket;
};
