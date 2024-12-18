'use client'
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  ReactNode,
} from "react";
import { flattenSalesData } from "@/utils/generalFunctions";
import { Invoice } from "@/types/salesDataTypes";

// Define the context type
interface WebSocketContextType {
  data: Invoice[];
  sheetData: Invoice[];
  setData: React.Dispatch<React.SetStateAction<Invoice[]>>;
  isComplete: boolean;
  error: string | null;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  wsRef: React.MutableRefObject<WebSocket | null>;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

// WebSocketProvider component to wrap the app and provide the WebSocket context
export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Invoice[]>([]);
  const [sheetData, setSheetData] = useState<Invoice[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Use a ref to track if data has already been processed to avoid unnecessary state updates
  const isDataProcessed = useRef(false);

  useEffect(() => {
    const url = "ws://localhost:5000";
    const spreadsheetId = "1BUk3rk7-xZHOSX5G6wGLr2bXkpbnT1dIse6B7GBDwmg";
    const range = "DAILY SALES DATA NUBRAS";

    if (typeof window !== "undefined" && !wsRef.current) {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established");
        const message = JSON.stringify({ spreadsheetId, range });
        wsRef.current?.send(message);
      };

      wsRef.current.onmessage = (event) => {
        const { type, data: chunk, message } = JSON.parse(event.data);

        if (type === "data") {
          // Batch updates to data
          setData((prevData) => [...prevData, ...chunk]);
        } else if (type === "complete") {
          setIsComplete(true); // Only mark as complete when WebSocket signals it's done
        } else if (type === "error") {
          setError(message);
        }
      };

      wsRef.current.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError("WebSocket connection error.");
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }

    // Cleanup WebSocket connection
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []); // This effect runs only once to set up the WebSocket connection

  useEffect(() => {
    if (isComplete && !isDataProcessed.current) {
      // Flatten and update sheet data once the WebSocket stream is complete
      const newSheetData = flattenSalesData(data) as Invoice[];
      console.log("new sheet data", newSheetData);
      setSheetData(newSheetData);
      setData([]); // Clear temp data after processing
      isDataProcessed.current = true; // Set flag to prevent unnecessary re-renders
    }
  }, [isComplete, data]); // Only trigger this effect when isComplete or data changes

  return (
    <WebSocketContext.Provider
      value={{
        data,
        sheetData,
        setData,
        isComplete,
        error,
        setIsComplete,
        wsRef,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to access WebSocket context
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};
