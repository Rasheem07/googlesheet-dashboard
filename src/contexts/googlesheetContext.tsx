
"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Invoice } from "@/types/salesDataTypes";
import { useQuery } from "@tanstack/react-query";
import { revalidateData } from "@/actions/revalidate";

// Define the context type
interface GoogleSheetsContextType {
  sheetData: Invoice[];
  isComplete: boolean;
  error: string | null;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  refetching: boolean;
}

const GoogleSheetsContext = createContext<GoogleSheetsContextType | undefined>(
  undefined
);

export const GoogleSheetsProvider = ({ children }: { children: ReactNode }) => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refetching, setrefetching] = useState(false)

  const spreadsheetId = "1BUk3rk7-xZHOSX5G6wGLr2bXkpbnT1dIse6B7GBDwmg";
  const range = "DAILY SALES DATA NUBRAS";

  const {
    data: sheetData,
    isError,
    isLoading,
    error: queryError,
    refetch: refetchfromRQ
  } = useQuery<Invoice[]>({
    queryKey: ["sheetData", spreadsheetId, range],
    queryFn: async () => {
      // Make request to the server-side API route
      const response = await fetch(
        `/api/getdata?spreadsheetId=${spreadsheetId}&range=${range}`,
        {
          cache: 'no-store'
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unknown error");
      }

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const refetch = async () => {
    setrefetching(true);
    try {
      await revalidateData(spreadsheetId, range); // Revalidate data (server-side action)
      await refetchfromRQ(); // Refetch data from query
    } catch (error) {
      console.error("Error during refetching:", error);
      setError("Error during refetching data");
    } finally {
      setrefetching(false);
    }
  }

  useEffect(() => {
    if (isError && queryError instanceof Error) {
      setError(queryError.message);
    }

    if (!isLoading && !isError) {
      setIsComplete(true);
    }
  }, [isError, queryError, isLoading]);

  return (
    <GoogleSheetsContext.Provider
      value={{
        sheetData: sheetData || [],
        isComplete,
        error,
        setIsComplete,
        refetch,
        refetching
      }}
    >
      {children}
    </GoogleSheetsContext.Provider>
  );
};

// Custom hook to access Google Sheets context
export const useGoogleSheetsContext = () => {
  const context = useContext(GoogleSheetsContext);
  if (!context) {
    throw new Error(
      "useGoogleSheetsContext must be used within a GoogleSheetsProvider"
    );
  }
  return context;
};
