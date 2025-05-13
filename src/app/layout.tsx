import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const cirkular = localFont({
  src: "../fonts/cirkular.ttf",
  variable: "--font-cirkular",
});

export const metadata: Metadata = {
  title: "Cirkular",
  description: "A modern and sleek way to design.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cirkular.variable}>
      <body
        className={cn("min-h-screen bg-background antialiased", "font-sans")}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
