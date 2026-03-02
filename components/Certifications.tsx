"use client"

import { SectionWrapper } from "./SectionWrapper"
import { Award } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import certifications from "@/data/certifications"


export default function Certifications() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"
  const neon = isDark ? "#00dcff" : "#0077cc"

  return (
    <SectionWrapper id="certificacoes" title={t.certTitle} subtitle={t.certSubtitle}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="relative rounded-xl border backdrop-blur-sm p-6 transition-all duration-400 group hover:-translate-y-1 bg-card/60"
            style={{ borderColor: `rgba(${neonRgb}, 0.1)` }}
          >
            <div className="relative flex items-start gap-3">
              <Award
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: neon, filter: `drop-shadow(0 0 4px rgba(${neonRgb},0.4))` }}
              />
              <div>
                <h3 className="font-semibold text-foreground text-sm">{cert.name}</h3>
                <p className="text-xs mt-1 font-mono" style={{ color: `rgba(${neonRgb}, 0.7)` }}>
                  {cert.platform}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
