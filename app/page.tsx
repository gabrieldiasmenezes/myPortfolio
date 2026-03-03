"use client"

import  Background  from "@/components/Background"
import  HeroSection  from "@/components/HeroSection"
import Formations from "@/components/Formations"
import  Certifications  from "@/components/Certifications"
import  Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import Contact from "@/components/Contact"
import AboutMe from "@/components/AboutMe"

import Navbar from "@/components/NavBars"
import Footer from "@/components/Footer"


export default function Page() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutMe />
        <Formations/>
        <Certifications />
        <Projects/>
        <Skills/>
        <Contact/>
      </main>
      <Footer />
    </>
  )
}
