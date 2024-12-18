"use client";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import React, { useEffect, useTransition } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "./ui/button";
import { useMainContext } from "@/contexts/mainContext";
import { Lightbulb, Moon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const playfair = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const { theme, toggleTheme, language, toggleLanguage } = useMainContext();
  const router = useRouter();

  const t = useTranslations('analytics');

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
      const lang = currentPath.split('/')[1];
      if (lang !== language) {
        toggleLanguage(lang);
      }
    };

    handleRouteChange(); // Call once to set the initial value

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [language, toggleLanguage]);

  const handleLanguageChange = (value: string) => {
    startTransition(() => {
      
      router.push(`/${value}`);
    });
  };

  return (
    <div
      className={cn(
        "min-w-full bg-zinc-50 border-b dark:bg-sidebar border-b-gray-300 shadow-inner flex items-center justify-between px-8 top-0 inset-x-0 py-4 text-blue-600 text-xl",
        playfair.className
      )}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-x-5">
        {/* Language Select */}
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="bg-transparent border dark:border-gray-600">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t('languages.english')}</SelectItem>
            <SelectItem value="ar">{t('languages.arabic')}</SelectItem>
          </SelectContent>
        </Select>

        {/* Theme Toggle */}
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="text-black h-6 w-6 transition-all" />
          ) : (
            <Lightbulb className="text-white h-6 w-6 transition-all" />
          )}
        </button>

        {/* Button */}
        <Button
          variant={"default"}
          className="bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white hover:bg-blue-600"
        >
          {t('buttons.getLatest')}
        </Button>
      </div>
    </div>
  );
}
