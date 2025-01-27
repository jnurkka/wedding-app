import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "J & J Wedding",
  description: "The website of the J&J Wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="theme-color"
          content="#f6f8fa"
          media="(prefers-color-scheme: light)"
        ></meta>
        <meta
          name="theme-color"
          content="#161b22"
          media="(prefers-color-scheme: dark)"
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
