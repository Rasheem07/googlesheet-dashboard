"use client";
import React, { startTransition, useEffect } from "react";
import MaxWidthWrapper from "../maxWidthWrapper";
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
import { Lightbulb, Moon } from "lucide-react";

export default function PrimaryHeader() {
  const { language, theme, toggleTheme, toggleLanguage } = useMainContext();
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
    <MaxWidthWrapper className="flex items-center justify-between w-full py-4 border-b border-gray-300">
      <h1 className="flex items-center gap-x-2 font-bold text-lg text-primary dark:text-primary">
        <span className="h-8 w-8 rounded-full shadow-inner bg-zinc-300" />
        Al nubras
      </h1>
      <div className="flex items-center gap-x-8">
        <Link
          href="/en/docs"
          className="text-primary dark:text-primary font-semibold"
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
    </MaxWidthWrapper>
  );
}
