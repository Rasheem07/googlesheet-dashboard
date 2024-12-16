"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";

interface WebSocketContextType {
  ws: WebSocket | null;
  sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ws = useRef<WebSocket | null>(null); // Use useRef to persist WebSocket instance

  useEffect(() => {
    // Only initialize WebSocket once when the provider is mounted
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket connection closed", event);
    };

    // Cleanup WebSocket on unmount
    return () => {
      if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
        ws.current.close();
        console.log("WebSocket connection closed during cleanup");
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const sendMessage = (message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.error(
        "WebSocket is not open. ReadyState:",
        ws.current?.readyState
      );
    }
  };

  return (
    <WebSocketContext.Provider value={{ ws: ws.current, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};
