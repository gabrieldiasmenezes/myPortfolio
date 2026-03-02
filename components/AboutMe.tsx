"use client"

import Image from "next/image"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import { SectionWrapper } from "./SectionWrapper"
import { User } from "lucide-react"

export default function AboutMe() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"
  const blue = isDark ? "#1e90ff" : "#0066dd"

  return (
    <SectionWrapper id="sobre" title={t.aboutTitle} subtitle={t.aboutSubtitle}>
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Photo */}
        <div className="relative shrink-0 group">
          {/* Glow ring */}
          <div
            className="absolute -inset-3 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-md"
            style={{ background: `radial-gradient(circle, rgba(${neonRgb},0.25), transparent 70%)` }}
          />
          {/* Border ring */}
          <div
            className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1"
            style={{
              background: `linear-gradient(135deg, ${neon}, ${blue}, ${neon})`,
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-card">
              <Image
                src="/images/profile.jpg"
                alt="Foto de perfil"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 space-y-5">
          <p
            className="text-base leading-relaxed"
            style={{ color: isDark ? "rgba(220,230,245,0.85)" : "rgba(30,40,60,0.8)" }}
          >
            {t.aboutText1}
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: isDark ? "rgba(220,230,245,0.85)" : "rgba(30,40,60,0.8)" }}
          >
            {t.aboutText2}
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: isDark ? "rgba(220,230,245,0.85)" : "rgba(30,40,60,0.8)" }}
          >
            {t.aboutText3}
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
