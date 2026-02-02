import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dockyard — AI Agent Project Scaffolding",
  description:
    "The shipyard for AI agent projects. Full-stack scaffolding engine with smart contract templates, auto-generated API docs, and one-click deployment pipeline.",
  openGraph: {
    title: "Dockyard 🦞",
    description: "Describe what you want to build — get a production-ready project in seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dockyard 🦞",
    description: "AI-powered project scaffolding with smart contracts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
