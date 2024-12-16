/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import AnalyticsContextProvider from "@/contexts/analyticsContext";
import { MainContextProvider } from "@/contexts/mainContext";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors`}
      >
        <NextIntlClientProvider messages={messages}>
          <MainContextProvider>
            <SidebarProvider className="flex">
              <AppSidebar />
              <AnalyticsContextProvider>
                <main className="w-full min-w-screen sm:min-w-0 relative">
                  <div className="sm:hidden absolute top-0 left-0 py-3 px-2">
                    <SidebarTrigger />
                  </div>
                  <Header />
                  {children}
                </main>
              </AnalyticsContextProvider>
            </SidebarProvider>
          </MainContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;
