"use client"

import { ExternalLink, Github } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import projectData from "@/data/projects"


type ButtonProjectsProps = {
    t: string;
    link:string;
    neonRgb:string;
    neon:string;

}
export default function ButtonProjects({ t, neonRgb, neon,link }: ButtonProjectsProps) {

  return (
      <div className="flex justify-center mt-14">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-10 py-4 rounded-2xl font-semibold text-sm tracking-wide 
                    transition-all duration-300 group overflow-hidden
                    hover:-translate-y-1 hover:scale-[1.03]"
          style={{
            background: `linear-gradient(135deg, rgba(${neonRgb},0.18), rgba(${neonRgb},0.08))`,
            border: `1px solid rgba(${neonRgb},0.35)`,
            color: neon,
            boxShadow: `0 0 20px rgba(${neonRgb},0.15)`
          }}
        >
          {/* Glow animado no hover */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              boxShadow: `0 0 40px rgba(${neonRgb},0.45)`
            }}
          />

          {/* Shimmer effect */}
          <span className="absolute inset-0 overflow-hidden rounded-2xl">
            <span
              className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                        group-hover:animate-[shimmer_1.2s_forwards]"
            />
          </span>

          <span className="relative flex items-center gap-3">
            <Github className="w-5 h-5" />
            {t}
          </span>
        </a>
      </div>
  )
}
