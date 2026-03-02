"use client"

import translations from "@/data/content"
import { createContext, useContext, useState, type ReactNode } from "react"

type Lang = "pt" | "en"

type Translations = typeof translations.pt  | typeof translations.en

interface LangContextType {
  lang: Lang
  toggleLang: () => void
  t: Translations
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt")

  const toggleLang = () => setLang((prev) => (prev === "pt" ? "en" : "pt"))

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used within LangProvider")
  return ctx
}
