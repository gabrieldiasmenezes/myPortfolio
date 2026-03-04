"use client"

import { SectionWrapper } from "./SectionWrapper"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import projectData from "@/data/projects"
import ButtonProjects from "./ProjectsComponents/button"
import ProjectCards from "./ProjectsComponents/projectsCards"

export default function Projects() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const blue = isDark ? "#1e90ff" : "#0066dd"
  const projects = projectData(t)

  return (
    <SectionWrapper id="projetos" title={t.projTitle} subtitle={t.projSubtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCards
            key={project.name}
            name={project.name}
            description={project.description}
            techs={project.techs}
            github={project.github}
            viewGithub={t.viewGithub}
            neonRgb={neonRgb}
            neon={neon}
            blue={blue}
          />
        ))}
      </div>
      
      <ButtonProjects t={t.repositoryButtons} neonRgb={neonRgb} neon={neon} link="https://github.com/gabrieldiasmenezes?tab=repositories" />
    </SectionWrapper>
  )
}
