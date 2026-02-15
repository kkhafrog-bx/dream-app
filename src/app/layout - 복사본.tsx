import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AI 꿈해몽",
  description: "AI가 해석해 주는 꿈 분석 웹 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`bg-background text-foreground antialiased dream-font ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
