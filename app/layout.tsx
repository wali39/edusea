import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ToasterProvider from "./provider/toaster-provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Academeconnect",
  description: "Explore the knowledge ocean",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ToasterProvider />
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
