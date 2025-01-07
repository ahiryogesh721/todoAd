"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Provider from "@/provider";
import Heder from "@/components/Heder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Heder />
          {children}
        </body>
      </html>
    </Provider>
  );
}
