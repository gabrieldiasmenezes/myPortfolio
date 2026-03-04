"use client"

import { ExternalLink, Github } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import projectData from "@/data/projects"


type ProjectCardsProps = {
    name: string;
    description: string;
    techs: string[];
    github: string;
    viewGithub: string;
    neonRgb:string;
    neon:string;
    blue:string;
}
export default function ProjectCards({ name, description, techs, github, viewGithub, neonRgb, neon,blue }: ProjectCardsProps) {

  return (
        <div
            key={name}
            className="relative rounded-xl border backdrop-blur-sm p-8 transition-all duration-400 group hover:-translate-y-1 flex flex-col bg-card/60"
            style={{ borderColor: `rgba(${neonRgb}, 0.1)` }}
          >
            <div className="relative flex-1">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink
                  className="w-4 h-4"
                  style={{ color: neon, filter: `drop-shadow(0 0 4px rgba(${neonRgb},0.4))` }}
                />
                <h3 className="text-lg font-bold text-foreground">{name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-full border"
                    style={{
                      borderColor: `rgba(${neonRgb}, 0.15)`,
                      backgroundColor: `rgba(${neonRgb}, 0.05)`,
                      color: neon,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative mt-6">
              <a
                href={github}
                className="inline-flex items-center gap-2 text-sm hover:underline transition-colors"
                style={{ color: blue }}
              >
                <Github className="w-4 h-4" />
                {viewGithub}
              </a>
            </div>
        </div>
  )
}
