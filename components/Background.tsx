"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "@/contexts/theme-context"

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  pulseSpeed: number
  connections: number[]
  energy: number
  type: "data" | "hub" | "signal"
}

const DATA_CHARS = [
  "0", "1", "%", "#", "$", "+", "=",
  "42", "3.14", "0x", ">>", "<<", "[]",
  "{}", "</>", "fn", "AI", "ML", "DB",
]

function getColors(isDark: boolean) {
  if (isDark) {
    return {
      neonBlue: "30, 144, 255",
      neonCyan: "0, 220, 255",
      neonLight: "100, 180, 255",
      electric: "60, 100, 255",
      glowWhite: "180, 220, 255",
      gridAlpha: 0.015,
      baseNodeAlpha: 0.2,
      baseConnAlpha: 0.08,
    }
  }
  return {
    neonBlue: "0, 100, 200",
    neonCyan: "0, 119, 204",
    neonLight: "30, 80, 160",
    electric: "20, 60, 180",
    glowWhite: "60, 120, 200",
    gridAlpha: 0.04,
    baseNodeAlpha: 0.25,
    baseConnAlpha: 0.06,
  }
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const trailRef = useRef<TrailPoint[]>([])
  const frameRef = useRef(0)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  const getColorsRef = useCallback(() => getColors(themeRef.current === "dark"), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let nodes: Node[] = []
    let ripples: WaveRipple[] = []
    let symbols: FloatingSymbol[] = []
    let lastRippleTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const area = canvas.width * canvas.height
      const count = Math.min(140, Math.max(50, Math.floor(area / 12000)))
      nodes = []

      for (let i = 0; i < count; i++) {
        const isHub = Math.random() < 0.14
        const isSignal = !isHub && Math.random() < 0.18
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: 0,
          baseY: 0,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: isHub ? 4 + Math.random() * 2.5 : isSignal ? 1.8 : 2.2 + Math.random(),
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.025,
          connections: [],
          energy: 0,
          type: isHub ? "hub" : isSignal ? "signal" : "data",
        })
        nodes[i].baseX = nodes[i].x
        nodes[i].baseY = nodes[i].y
      }

      const maxDist = Math.min(canvas.width, canvas.height) * 0.18
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connections = []
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (dist < maxDist) {
            nodes[i].connections.push(j)
          }
        }
      }

      const symCount = Math.floor(area / 45000)
      symbols = Array.from({ length: symCount }, () => createSymbol())
    }

    const createSymbol = (): FloatingSymbol => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20 + Math.random() * 200,
      speed: 0.15 + Math.random() * 0.35,
      opacity: 0.05 + Math.random() * 0.1,
      char: DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)],
      size: 10 + Math.random() * 14,
      wobblePhase: Math.random() * Math.PI * 2,
    })

    const drawConnections = (frame: number) => {
      const c = getColorsRef()
      const maxDist = Math.min(canvas.width, canvas.height) * 0.18
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (const j of a.connections) {
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > maxDist) continue

          const proximity = 1 - dist / maxDist
          const midX = (a.x + b.x) / 2
          const midY = (a.y + b.y) / 2
          const mouseDist = Math.hypot(midX - mx, midY - my)
          const mouseBoost = mouseDist < 220 ? (1 - mouseDist / 220) * 0.2 : 0

          const pulse = Math.sin(frame * 0.02 + i * 0.5) * 0.5 + 0.5
          const energyBoost = (a.energy + b.energy) * 0.06
          const alpha = Math.min(0.3, proximity * c.baseConnAlpha + mouseBoost + pulse * 0.03 + energyBoost)

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${c.neonCyan}, ${alpha})`
          ctx.lineWidth = 0.6 + proximity * 1
          ctx.stroke()

          if (alpha > 0.1) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${c.neonBlue}, ${alpha * 0.3})`
            ctx.lineWidth = 2 + proximity * 2
            ctx.stroke()
          }

          if (alpha > 0.08 && (a.energy > 0.3 || b.energy > 0.3)) {
            const t = Math.sin(frame * 0.03 + i * 0.7 + j * 0.3) * 0.5 + 0.5
            const px = a.x + (b.x - a.x) * t
            const py = a.y + (b.y - a.y) * t

            ctx.beginPath()
            ctx.arc(px, py, 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${c.glowWhite}, ${alpha * 2.5})`
            ctx.fill()

            const pglow = ctx.createRadialGradient(px, py, 0, px, py, 8)
            pglow.addColorStop(0, `rgba(${c.neonCyan}, ${alpha * 1.5})`)
            pglow.addColorStop(1, "rgba(0,0,0,0)")
            ctx.beginPath()
            ctx.arc(px, py, 8, 0, Math.PI * 2)
            ctx.fillStyle = pglow
            ctx.fill()
          }
        }
      }
    }

    const drawNodes = (frame: number) => {
      const c = getColorsRef()
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const node of nodes) {
        const pulse = Math.sin(frame * node.pulseSpeed + node.pulsePhase)
        const r = node.radius + pulse * (node.type === "hub" ? 1.8 : 0.6)

        const mouseDist = Math.hypot(node.x - mx, node.y - my)
        const mouseInfluence = mouseDist < 250 ? (1 - mouseDist / 250) : 0
        node.energy = node.energy * 0.94 + mouseInfluence * 0.06

        let color = c.neonLight
        let glowColor = c.neonBlue
        let alpha = c.baseNodeAlpha + pulse * 0.08 + node.energy * 0.5

        if (node.type === "hub") {
          color = c.neonCyan
          glowColor = c.neonCyan
          alpha = 0.4 + pulse * 0.2 + node.energy * 0.5
        } else if (node.type === "signal") {
          color = c.electric
          glowColor = c.electric
          alpha = 0.15 + Math.abs(pulse) * 0.25 + node.energy * 0.4
        }

        const glowR = r * (4 + node.energy * 5)
        const glowAlpha = node.type === "hub" ? alpha * 0.2 : node.energy > 0.05 ? alpha * 0.15 : alpha * 0.05
        const gradient = ctx.createRadialGradient(node.x, node.y, r * 0.3, node.x, node.y, glowR)
        gradient.addColorStop(0, `rgba(${glowColor}, ${glowAlpha})`)
        gradient.addColorStop(0.5, `rgba(${glowColor}, ${glowAlpha * 0.3})`)
        gradient.addColorStop(1, "rgba(0,0,0,0)")
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, Math.max(0.5, r), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${Math.min(1, alpha * 1.2)})`
        ctx.fill()

        if (node.type === "hub") {
          ctx.beginPath()
          ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${c.glowWhite}, ${Math.min(1, alpha * 0.8)})`
          ctx.fill()
        }
      }
    }

    const updateNodes = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        const margin = 50
        if (node.x < -margin) node.x = canvas.width + margin
        if (node.x > canvas.width + margin) node.x = -margin
        if (node.y < -margin) node.y = canvas.height + margin
        if (node.y > canvas.height + margin) node.y = -margin

        const dist = Math.hypot(node.x - mx, node.y - my)
        if (dist < 300 && dist > 1) {
          const force = (1 - dist / 300) * 0.8
          const angle = Math.atan2(node.y - my, node.x - mx)
          const orbitAngle = angle + Math.PI * 0.5
          node.vx += Math.cos(orbitAngle) * force * 0.15 + Math.cos(angle) * force * 0.05
          node.vy += Math.sin(orbitAngle) * force * 0.15 + Math.sin(angle) * force * 0.05
        }

        node.vx *= 0.985
        node.vy *= 0.985
        node.vx += (node.baseX - node.x) * 0.0001
        node.vy += (node.baseY - node.y) * 0.0001

        const maxV = 1.2
        const vel = Math.hypot(node.vx, node.vy)
        if (vel > maxV) {
          node.vx = (node.vx / vel) * maxV
          node.vy = (node.vy / vel) * maxV
        }
      }
    }

    const drawSymbols = (frame: number) => {
      const c = getColorsRef()
      ctx.save()
      ctx.textAlign = "center"

      for (const sym of symbols) {
        sym.y -= sym.speed
        const wobble = Math.sin(frame * 0.01 + sym.wobblePhase) * 15

        if (sym.y < -30) {
          Object.assign(sym, createSymbol())
        }

        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const dist = Math.hypot(sym.x + wobble - mx, sym.y - my)
        const mouseBoost = dist < 200 ? (1 - dist / 200) * 0.15 : 0

        ctx.globalAlpha = sym.opacity + mouseBoost
        ctx.font = `normal ${sym.size}px monospace`
        ctx.fillStyle = `rgba(${c.neonCyan}, 1)`

        if (mouseBoost > 0.03) {
          ctx.shadowColor = `rgba(${c.neonCyan}, 0.6)`
          ctx.shadowBlur = 8
        } else {
          ctx.shadowColor = `rgba(${c.neonBlue}, 0.3)`
          ctx.shadowBlur = 4
        }

        ctx.fillText(sym.char, sym.x + wobble, sym.y)
        ctx.shadowBlur = 0
      }

      ctx.restore()
    }

    const drawRipples = () => {
      const c = getColorsRef()
      ripples = ripples.filter((r) => {
        r.radius += r.speed
        r.opacity -= 0.003

        if (r.opacity <= 0 || r.radius > r.maxRadius) return false

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${c.neonCyan}, ${r.opacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${c.neonBlue}, ${r.opacity * 0.4})`
        ctx.lineWidth = 4
        ctx.stroke()

        return true
      })
    }

    const drawMouseTrail = () => {
      const c = getColorsRef()
      const trail = trailRef.current
      if (trail.length < 2) return

      ctx.save()
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      for (let i = 1; i < trail.length; i++) {
        const prev = trail[i - 1]
        const curr = trail[i]
        const age = curr.age / 30
        const alpha = Math.max(0, 0.18 * (1 - age))
        if (alpha <= 0) continue

        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(curr.x, curr.y)
        ctx.strokeStyle = `rgba(${c.neonBlue}, ${alpha * 0.3})`
        ctx.lineWidth = 6 * (1 - age)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(curr.x, curr.y)
        ctx.strokeStyle = `rgba(${c.neonCyan}, ${alpha})`
        ctx.lineWidth = 2 * (1 - age)
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawMouseConnections = () => {
      const c = getColorsRef()
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      if (mx < -1000) return

      const connectRadius = 220
      for (const node of nodes) {
        const dist = Math.hypot(node.x - mx, node.y - my)
        if (dist < connectRadius) {
          const alpha = (1 - dist / connectRadius) * 0.15
          ctx.beginPath()
          ctx.moveTo(mx, my)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = `rgba(${c.neonLight}, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.setLineDash([4, 4])
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      const g1 = ctx.createRadialGradient(mx, my, 0, mx, my, 60)
      g1.addColorStop(0, `rgba(${c.glowWhite}, 0.08)`)
      g1.addColorStop(0.4, `rgba(${c.neonCyan}, 0.04)`)
      g1.addColorStop(1, "rgba(0,0,0,0)")
      ctx.beginPath()
      ctx.arc(mx, my, 60, 0, Math.PI * 2)
      ctx.fillStyle = g1
      ctx.fill()

      const g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 150)
      g2.addColorStop(0, `rgba(${c.neonBlue}, 0.05)`)
      g2.addColorStop(0.5, `rgba(${c.electric}, 0.02)`)
      g2.addColorStop(1, "rgba(0,0,0,0)")
      ctx.beginPath()
      ctx.arc(mx, my, 150, 0, Math.PI * 2)
      ctx.fillStyle = g2
      ctx.fill()
    }

    const drawGrid = () => {
      const c = getColorsRef()
      const spacing = 60
      ctx.strokeStyle = `rgba(${c.neonBlue}, ${c.gridAlpha})`
      ctx.lineWidth = 0.5

      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      frameRef.current++
      const frame = frameRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawGrid()
      updateNodes()
      drawConnections(frame)
      drawSymbols(frame)
      drawRipples()
      drawMouseTrail()
      drawMouseConnections()
      drawNodes(frame)

      const trail = trailRef.current
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age++
        if (trail[i].age > 30) trail.splice(i, 1)
      }

      if (frame - lastRippleTime > 100) {
        const hubs = nodes.filter((n) => n.type === "hub")
        if (hubs.length > 0) {
          const hub = hubs[Math.floor(Math.random() * hubs.length)]
          ripples.push({
            x: hub.x,
            y: hub.y,
            radius: 5,
            maxRadius: 90 + Math.random() * 90,
            opacity: 0.12,
            speed: 0.5 + Math.random() * 0.5,
          })
          lastRippleTime = frame
        }
      }

      animId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 })
      if (trailRef.current.length > 25) trailRef.current.shift()
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
      trailRef.current = []
    }

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 180,
        opacity: 0.18,
        speed: 2.5,
      })
      for (const node of nodes) {
        const dist = Math.hypot(node.x - e.clientX, node.y - e.clientY)
        if (dist < 200) {
          node.energy = Math.min(1, node.energy + (1 - dist / 200) * 0.9)
        }
      }
    }

    resize()
    animate()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("click", handleClick)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("click", handleClick)
    }
  }, [getColorsRef])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
