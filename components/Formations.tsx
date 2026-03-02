"use client"

import { SectionWrapper } from "./SectionWrapper"
import { useLang } from "@/contexts/language-context"
import FormationBox from "./FormationBox"

export default function Formations() {
  const { t } = useLang()

  return (
    <SectionWrapper id="formacoes" title={t.formationsTitle} subtitle={t.formationsSubtitle}>
      <div className="max-w-2xl mx-auto space-y-8">
          <FormationBox
            graduationName={t.formationName}
            period="2024 - 2025"
            description={t.formationDesc}
          />
          <FormationBox
            graduationName={t.formationName2}
            period="2026 - 2029"
            description={t.formationDesc2}
          />
      </div>
    </SectionWrapper>
  )
}
