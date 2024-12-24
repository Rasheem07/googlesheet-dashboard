import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { MainContextProvider } from "@/contexts/mainContext";
import { getMessages } from "next-intl/server";
import PrimaryHeader from "@/components/headers/primaryHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashify - google sheets dashboard",
  description: "dashboard for displaying google spreadhseets and their data",
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    return notFound();
  }

  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <MainContextProvider>
        <html lang={locale}>
          <body
            className={`${geistSans.variable}  ${geistMono.variable} dark antialiased transition-colors`}
          >
            <PrimaryHeader />
            {children}
          </body>
        </html>
      </MainContextProvider>
    </NextIntlClientProvider>
  );
}
