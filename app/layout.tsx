import type { Metadata } from "next";
import "./globals.css";
import { TopAppBar } from "@/components/layout/top-app-bar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ChatWidget } from "@/components/chat/chat-widget";

export const metadata: Metadata = {
  title: "Blater - Merge Shop UMKM Purbalingga",
  description: "Platform e-commerce hyperlocal untuk UMKM kuliner di Kabupaten Purbalingga",
  icons: {
    icon: '/MegeIcon.png',
    shortcut: '/MegeIcon.png',
    apple: '/MegeIcon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-surface-page text-content-primary antialiased min-h-screen flex flex-col">
        <TopAppBar />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
        <BottomNav />
        <ChatWidget />
      </body>
    </html>
  );
}
