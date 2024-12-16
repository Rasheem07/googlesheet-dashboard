'use client'
import React, { createContext, useState, useContext, ReactNode } from "react";

interface MainContextType {
  theme: string;
  toggleTheme: () => void;
  language: string;
  toggleLanguage: (language: string) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("dark");
  const [language, setLanguage] = useState<string>("en"); // Default to English

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = (language: string) => {
    setLanguage(language);
  };

  return (
    <MainContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};
