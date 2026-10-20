"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RQProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1 } } })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}
