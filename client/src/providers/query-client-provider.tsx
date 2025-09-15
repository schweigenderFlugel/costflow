"use client";

import { ReactQueryProviderProps } from "@/interfaces/interface-react-query-provider-props";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const staleTime = 60 * 1000; // 1 minuto
const gcTime = 10 * 60 * 1000; // 10 minutos

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime,
            gcTime,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
