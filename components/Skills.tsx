"use client"

import { SectionWrapper } from "./SectionWrapper"
import { Code, Brain } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import SkillBox from "./SkillBox"

const hardSkills = ["Python","SQL","Power BI","Excel","Pandas / NumPy","Matplotlib / Seaborn","Git / GitHub","Dashboard Design"]



export default function Skills() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"
  const blue = isDark ? "#1e90ff" : "#0066dd"

  const softSkills = [t.soft1, t.soft2, t.soft3, t.soft4, t.soft5, t.soft6]

  return (
    <SectionWrapper id="skills" title={t.skillsTitle} subtitle={t.skillsSubtitle}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <SkillBox 
          name={t.hardSkills} 
          icon={<Code className="w-5 h-5" style={{ color: blue, filter: `drop-shadow(0 0 4px rgba(${neonRgb},0.4))` }} />} 
          skills={hardSkills} />

        <SkillBox 
          name={t.softSkills} 
          icon={<Brain className="w-5 h-5" style={{ color: neon, filter: `drop-shadow(0 0 4px rgba(${neonRgb},0.4))` }} />} 
          skills={softSkills} />
 
      </div>
    </SectionWrapper>
  )
}
