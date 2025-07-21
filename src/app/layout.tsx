import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ['100','300',"400","700"], // Add the desired weights as needed
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Blog Summariser",
  description: "A web app that converts any blog post into a concise summary using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} antialiased`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
