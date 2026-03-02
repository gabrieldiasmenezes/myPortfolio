"use client"

import { useEffect, useState } from "react"
import { ArrowDown, TrendingUp } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"
  const blue = isDark ? "#1e90ff" : "#0066dd"

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div
        className={`text-center max-w-3xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-8 border"
          style={{
            borderColor: `rgba(${neonRgb}, 0.25)`,
            backgroundColor: `rgba(${neonRgb}, 0.06)`,
            color: neon,
            boxShadow: `0 0 20px rgba(${neonRgb}, 0.1)`,
          }}
        >
          <TrendingUp className="w-4 h-4" />
          {t.roleTag}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-balance text-foreground">
          Gabriel Dias 
          <span
            className="block mt-2 text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, ${blue}, ${neon}, ${blue})`,
            }}
          >
            Menezes
          </span>
        </h1>

        <div
          className="mx-auto mt-4 w-32 h-px opacity-60"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${neon}, transparent)` }}
        />

        <p className="mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-pretty text-muted-foreground">
          {t.heroSubtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projetos"
            className="px-8 py-3 text-white rounded-lg font-medium transition-all duration-300"
            style={{
              backgroundColor: blue,
              boxShadow: `0 0 20px rgba(${neonRgb}, 0.3)`,
            }}
          >
            {t.viewProjects}
          </a>
          <a
            href="#contato"
            className="px-8 py-3 rounded-lg font-medium transition-all duration-300 border text-foreground"
            style={{
              borderColor: `rgba(${neonRgb}, 0.25)`,
            }}
          >
            {t.getInTouch}
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <ArrowDown className="w-5 h-5 opacity-60 mx-auto" style={{ color: neon }} />
        </div>
      </div>
    </section>
  )
}
