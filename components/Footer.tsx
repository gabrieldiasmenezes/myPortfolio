"use client"

import { BarChart3 } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

export default function Footer() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"

  return (
    <footer
      className="relative border-t py-8 px-6"
      style={{ borderColor: `rgba(${neonRgb}, 0.08)` }}
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <BarChart3
            className="w-4 h-4"
            style={{ color: neon, filter: `drop-shadow(0 0 4px rgba(${neonRgb},0.4))` }}
          />
          <span className="font-mono" style={{ color: `rgba(${neonRgb}, 0.7)` }}>
            DataForge
          </span>
        </div>
        <p>&copy; {new Date().getFullYear()} {t.allRights}</p>
        <div> Ícones feitos por <a href="https://www.flaticon.com/br/autores/iconmarketpk" title="IconMarketPK"> IconMarketPK </a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com'</a></div>
      </div>
    </footer>
  )
}
