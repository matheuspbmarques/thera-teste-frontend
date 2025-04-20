'use client';

import "./globals.css";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>Project</title>
      </head>
      <QueryClientProvider client={queryClient}>
        <body className={`${poppins.className} bg-slate-800`}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
