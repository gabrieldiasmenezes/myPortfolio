"use client"

import { useState } from "react"
import { Menu, X, BarChart3, Sun, Moon, Globe } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useLang } from "@/contexts/language-context"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()

  const isDark = theme === "dark"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"

  const links = [
    { href: "#home", label: t.home },
    { href: "#sobre", label: t.about },
    { href: "#formacoes", label: t.formations },
    { href: "#certificacoes", label: t.certifications },
    { href: "#projetos", label: t.projects },
    { href: "#skills", label: t.skills },
    { href: "#contato", label: t.contact },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
      style={{
        backgroundColor: isDark ? "rgba(14,18,32,0.82)" : "rgba(245,247,255,0.88)",
        borderColor: `rgba(${neonRgb}, 0.08)`,
      }}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 font-bold text-lg" style={{ color: neon }}>
          <BarChart3 className="w-6 h-6" style={{ filter: `drop-shadow(0 0 6px rgba(${neonRgb},0.5))` }} />
          <span className="font-mono">DataPortfolio</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-300"
              style={{ color: isDark ? "rgba(180,195,220,0.7)" : "rgba(40,50,80,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = neon)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isDark ? "rgba(180,195,220,0.7)" : "rgba(40,50,80,0.7)")
              }
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-300 border"
            style={{
              borderColor: `rgba(${neonRgb}, 0.2)`,
              color: neon,
              backgroundColor: `rgba(${neonRgb}, 0.06)`,
            }}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "pt" ? "EN" : "PT"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-300 border"
            style={{
              borderColor: `rgba(${neonRgb}, 0.2)`,
              color: neon,
              backgroundColor: `rgba(${neonRgb}, 0.06)`,
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-mono font-semibold border"
            style={{
              borderColor: `rgba(${neonRgb}, 0.2)`,
              color: neon,
              backgroundColor: `rgba(${neonRgb}, 0.06)`,
            }}
            aria-label="Toggle language"
          >
            <Globe className="w-3 h-3" />
            {lang === "pt" ? "EN" : "PT"}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border"
            style={{
              borderColor: `rgba(${neonRgb}, 0.2)`,
              color: neon,
              backgroundColor: `rgba(${neonRgb}, 0.06)`,
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden backdrop-blur-xl border-b px-6 pb-4"
          style={{
            backgroundColor: isDark ? "rgba(14,18,32,0.95)" : "rgba(245,247,255,0.95)",
            borderColor: `rgba(${neonRgb}, 0.08)`,
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm transition-colors"
              style={{ color: isDark ? "rgba(180,195,220,0.7)" : "rgba(40,50,80,0.7)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
