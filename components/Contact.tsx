"use client"

import { SectionWrapper } from "./SectionWrapper"
import { Send, Linkedin, Github } from "lucide-react"
import { useLang } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import useHandleSubmit from "@/hooks/useHandleSubmit"

export default function Contact() {
  const { t } = useLang()
  const { theme } = useTheme()

  const isDark = theme === "dark"
  const neonRgb = isDark ? "0,220,255" : "0,119,204"
  const neon = isDark ? "#00dcff" : "#0077cc"
  const blue = isDark ? "#1e90ff" : "#0066dd"
  const { handleSubmit, loading, success } = useHandleSubmit()
  const inputStyle = {
    borderColor: `rgba(${neonRgb}, 0.1)`,
  }


  return (
    <SectionWrapper id="contato" title={t.contactTitle} subtitle={t.contactSubtitle}>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">{t.nameLabel}</label>
            <input name="name" required type="text" placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.emailLabel}</label>
            <input name="email" required type="email" placeholder={t.emailPlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.messageLabel}</label>
            <textarea name="message" required rows={5} placeholder={t.messagePlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border resize-none"
              style={inputStyle}
            />
          </div>

          <button type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg font-medium"
            style={{
              backgroundColor: blue,
              boxShadow: `0 0 20px rgba(${neonRgb}, 0.25)`,
            }}
          >
            <Send className="w-4 h-4" />
            {loading ? "Sending..." : success ? "Message sent!" : t.sendMessage}
          </button>
        </form>

        <div className="flex items-center justify-center gap-6 mt-10">
          <a href="https://www.linkedin.com/in/gabriel-dias-5851382b5" className="p-3 rounded-lg border">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/gabrieldiasmenezes" className="p-3 rounded-lg border">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}