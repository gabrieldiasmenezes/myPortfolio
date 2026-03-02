"use client"

import { SectionWrapper } from "./SectionWrapper"
import { ExternalLink, Github } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

export default function Projects() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const blue = isDark ? "#1e90ff" : "#0066dd"

  const projects = [
    {
      name: t.proj1Name,
      description: t.proj1Desc,
      techs: ["Python", "Excel", "Pandas","Matplotlib"],
      github: "https://github.com/gabrieldiasmenezes/dashVendas",
    },
    {
      name: t.proj2Name,
      description: t.proj2Desc,
      techs: ["Firebase", "Firestore", "React Native", "Firebase IA"],
      github: "https://github.com/gabrieldiasmenezes/smartFinance",
    },
    {
      name: t.proj3Name,
      description: t.proj3Desc,
      techs: ["Python", "SQL", "API","REST API"],
      github: "https://github.com/gabrieldiasmenezes/pokemon-boxhttps://github.com/gabrieldiasmenezes/Box-Pokemon",
    },
    {
      name: t.proj4Name,
      description: t.proj4Desc,
      techs: ["Java", "Spring Boot", "SQL","REST API","Docker","PostgreSQL"],
      github: "https://github.com/gabrieldiasmenezes/sovrano-api",
    },
  ]

  return (
    <SectionWrapper id="projetos" title={t.projTitle} subtitle={t.projSubtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="relative rounded-xl border backdrop-blur-sm p-8 transition-all duration-400 group hover:-translate-y-1 flex flex-col bg-card/60"
            style={{ borderColor: `rgba(${neonRgb}, 0.1)` }}
          >
            <div className="relative flex-1">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink
                  className="w-4 h-4"
                  style={{ color: neon, filter: `drop-shadow(0 0 4px rgba(${neonRgb},0.4))` }}
                />
                <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techs.map((tech) => (
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
                href={project.github}
                className="inline-flex items-center gap-2 text-sm hover:underline transition-colors"
                style={{ color: blue }}
              >
                <Github className="w-4 h-4" />
                {t.viewGithub}
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
