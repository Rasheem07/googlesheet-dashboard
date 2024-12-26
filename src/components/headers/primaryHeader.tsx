"use client";
import React, { startTransition, useEffect, useState } from "react";
import MaxWidthWrapper from "../wrappers/maxWidthWrapper";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMainContext } from "@/contexts/mainContext";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ChartLine, Lightbulb, Moon } from "lucide-react";
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";

export default function PrimaryHeader() {
  const { language, theme, toggleTheme, toggleLanguage } = useMainContext();
  const loginstate =
    typeof window !== "undefined" && localStorage.getItem("isLogin");
  const [isLogin] = useState(loginstate);
  const router = useRouter();
  const path = usePathname();

  const handleLanguageChange = (value: string) => {
    startTransition(() => {
      router.push(`/${value}`);
    });
  };

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      const lang = currentPath.split("/")[1];
      if (lang !== language) {
        toggleLanguage(lang);
      }
    };

    handleRouteChange(); // Call once to set the initial value

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [language, toggleLanguage]);

  const locale = useLocale();

  const t = useTranslations("analytics");
  return (
    <header
      className={`${
        (path == `/${locale}/sign-in` || path == `/${locale}/sign-up`) &&
        "hidden"
      }`}
    >
      <MaxWidthWrapper className="flex items-center justify-between w-full py-4 border-b dark:border-gray-800 border-emerald-300 backdrop-blur-xl  shadow-lg z-10 fixed top-0 inset-x-0">
        <h1 className="flex items-center gap-x-2 font-bold text-lg text-primary dark:text-primary px-2">
          {/* <span className="h-8 w-8 rounded-full shadow-inner bg-zinc-300" /> */}
          <ChartLine />
          Dashify
        </h1>
        <div className="items-center gap-x-8 hidden md:flex">
          <Link
            href="/en/docs"
            className="text-primary dark:text-primary font-semibold font-mono text-lg"
          >
            Docs
          </Link>
          <Link
            href="/en/pricings"
            className="text-primary dark:text-primary font-semibold"
          >
            Pricings
          </Link>
          <Link
            href="/en/customers"
            className="text-primary dark:text-primary font-semibold"
          >
            Customers
          </Link>
          <Link
            href="/en/about"
            className="text-primary dark:text-primary font-semibold"
          >
            about
          </Link>
        </div>
        {isLogin ? (
          <div className="flex items-center gap-x-5">
            {/* Language Select */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="bg-transparent border dark:border-gray-600">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t("languages.english")}</SelectItem>
                <SelectItem value="ar">{t("languages.arabic")}</SelectItem>
              </SelectContent>
              <button onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="text-black h-6 w-6 transition-all" />
                ) : (
                  <Lightbulb className="text-white h-6 w-6 transition-all" />
                )}
              </button>
            </Select>
            <div className="min-h-10 w-10 min-w-10 bg-zinc-400 rounded-full"></div>
          </div>
        ) : (
          <div className="flex items-center gap-x-6">
            <SignedOut>
              <div className="bg-emerald-500 rounded-md shadow-md px-4 md:px-6 py-1.5">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        )}
      </MaxWidthWrapper>
    </header>
  );
}
