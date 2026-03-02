"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTheme } from "@/contexts/theme-context"

interface SectionWrapperProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, title, subtitle, children, className = "" }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollReveal(0.1)
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neon = isDark ? "#00dcff" : "#0077cc"

  return (
    <section id={id} className={`relative py-24 px-6 ${className}`}>
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
              {subtitle}
            </p>
          )}
          <div
            className="mt-4 mx-auto w-20 h-0.5 opacity-70"
            style={{ backgroundImage: `linear-gradient(to right, transparent, ${neon}, transparent)` }}
          />
        </div>
        {children}
      </div>
    </section>
  )
}
