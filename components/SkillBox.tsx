import { useTheme } from "@/contexts/theme-context"

type SkillBoxProps = {
    name: string
    icon: React.ReactNode
    skills: string[]
}

export default function SkillBox({ name, icon, skills }: SkillBoxProps){
      const { theme } = useTheme()
      const isDark = theme === "dark"
      const neon = isDark ? "#00dcff" : "#0077cc"
      const neonRgb = isDark ? "0,220,255" : "0,119,204"
    return(
        <div>
          <div className="flex items-center gap-2 mb-6">
            {icon}
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
          </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-5 py-4 rounded-xl border backdrop-blur-sm text-center text-sm font-medium hover:-translate-y-1 transition-all duration-300 text-foreground bg-card/60"
                style={{ borderColor: `rgba(${neonRgb}, 0.1)` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
    )
}