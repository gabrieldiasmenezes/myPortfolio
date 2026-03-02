import { Calendar, GraduationCap } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"


type FormationBoxProps = {
    graduationName: string
    period: string
    description: string
}
export default function FormationBox({ graduationName, period, description }: FormationBoxProps) {
      const { theme } = useTheme()
    
      const isDark = theme === "dark"
      const neonRgb = isDark ? "0,220,255" : "0,119,204"
      const neon = isDark ? "#00dcff" : "#0077cc"
    return(
               <div
          className="relative rounded-xl border backdrop-blur-sm p-8 transition-all duration-500 group bg-card/60"
          style={{
            borderColor: `rgba(${neonRgb}, 0.12)`,
          }}
        >
          <div className="relative flex items-start gap-4">
            <div
              className="p-3 rounded-lg shrink-0"
              style={{
                backgroundColor: `rgba(${neonRgb}, 0.08)`,
                color: neon,
                boxShadow: `0 0 12px rgba(${neonRgb}, 0.15)`,
              }}
            >
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{graduationName}</h3>
              <p className="text-muted-foreground mt-1">FIAP</p>
              <div className="flex items-center gap-2 mt-3 text-sm font-mono" style={{ color: neon }}>
                <Calendar className="w-4 h-4" />
                {period}
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
    
    )
}