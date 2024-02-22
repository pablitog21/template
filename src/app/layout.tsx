import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoginForm from "@/components/auth/LoginForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#d3ccfd] overflow-y-scroll overflow-xhidden`}>
       <LoginForm/>
        {children}
      </body>
    </html>
  );
}