/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAnalyticsContext } from '@/contexts/analyticsContext';
import { useState, useEffect, useRef } from 'react';

interface UseWebSocketParams {
  url: string;
  spreadsheetId: string;
  range: string;
}

interface Chunk {
  type: string;
  data: any[];
  message: string;
}

const useWebSocket = ({ url, spreadsheetId, range }: UseWebSocketParams) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const {setIsComplete} = useAnalyticsContext();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !wsRef.current) {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log('WebSocket connection established');
        const message = JSON.stringify({ spreadsheetId, range });
        wsRef.current?.send(message);
      };

      // Optimizing the onmessage handler to avoid blocking the main thread
      wsRef.current.onmessage = (event) => {
        const { type, data: chunk, message }: Chunk = JSON.parse(event.data);

        if (type === 'data') {
          // Batch updates to state for better performance
          // Using a function form of setState to batch and prevent unnecessary re-renders
          setData((prevData) => [...prevData, ...chunk]);
        } else if (type === 'complete') {
          setIsComplete(true);
        } else if (type === 'error') {
          setError(message);
        }
      };

      // Handle WebSocket error
      wsRef.current.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError('WebSocket connection error.');
      };

      // Handle WebSocket close
      wsRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };

      // Cleanup WebSocket on component unmount
    
    }
  }, [url, spreadsheetId, range]);

  // Optimized state return
  return { data, setData, error };
};

export default useWebSocket;
