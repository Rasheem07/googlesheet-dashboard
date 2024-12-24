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
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChartLine, Lightbulb, Moon } from "lucide-react";
import Image from "next/image";


export default function PrimaryHeader() {
  const { language, theme, toggleTheme, toggleLanguage } = useMainContext();
  const loginstate =
    typeof window !== "undefined" && localStorage.getItem("isLogin");
  const [isLogin] = useState(loginstate);
  const router = useRouter();

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

  const t = useTranslations("analytics");
  return (
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
        <Link prefetch href="/api/auth">
          <button type="button" className="flex items-center px-3 gap-x-1.5 bg-white text-gray-950 py-2 rounded-sm text-sm tracking-wider">
            <Image src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=' alt='G' width={16} height={16}/>
            Sign in with Google
          </button>
        </Link>
      )}
    </MaxWidthWrapper>
  );
}
