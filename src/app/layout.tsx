import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "꿈해석",
  description: "꿈을 섬세하게 해석해 주는 꿈 분석서비스",
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
