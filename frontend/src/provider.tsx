import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
export const queryClient = new QueryClient();
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
