import { chooseWanderPoint, flightDirection, isUsableTarget, shouldFly } from "./behavior.mjs"

const TUNING = {
  travel: [2000, 4000],
  investigate: [4000, 8000],
  away: [2000, 4000],
  visits: [6, 10],
  turn: 380,
  frame: 100,
  read: 110,
  drift: [8, 16],
  directionThreshold: 20,
  maxDelta: 50,
  controlClearance: 55,
}
const STORAGE_KEY = "moth-hidden"
const interests = "h1,h2,h3,h4,h5,h6,p,button,.btn,[role='button']"
const between = ([min, max]) => min + Math.random() * (max - min)
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const viewport = () => ({ width: window.innerWidth, height: window.innerHeight })

function hidden(element) {
  if (element.closest("[hidden], [aria-hidden='true'], .moth-control")) return true
  if (element.checkVisibility) {
    return !element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
  }
  for (let node = element; node; node = node.parentElement) {
    const style = getComputedStyle(node)
    if (style.display === "none" || style.visibility !== "visible" || Number(style.opacity) === 0) return true
  }
  return false
}

function avoidControl(point, view, control) {
  const rect = control.getBoundingClientRect()
  if (point.x > rect.left - TUNING.controlClearance && point.x < rect.right + TUNING.controlClearance &&
      point.y > rect.top - TUNING.controlClearance && point.y < rect.bottom + TUNING.controlClearance) {
    const below = rect.bottom + TUNING.controlClearance
    return { x: point.x, y: below < view.height - 10 ? below : Math.max(10, rect.top - TUNING.controlClearance) }
  }
  return point
}

function readingDestination(position, previous, control) {
  const view = viewport()
  const candidates = [...document.querySelectorAll(interests)].flatMap((element) => {
    const rect = element.getBoundingClientRect()
    const text = element.textContent || element.getAttribute("aria-label") || ""
    if (!isUsableTarget({ rect, text, hidden: hidden(element) }, view)) return []
    const left = Math.max(0, rect.left)
    const right = Math.min(view.width, rect.right)
    const top = Math.max(0, rect.top)
    const bottom = Math.min(view.height, rect.bottom)
    const x = right + 52 < view.width ? right + 45 : left - 45
    const point = avoidControl({ x: clamp(x, 25, view.width - 25), y: clamp((top + bottom) / 2, 25, view.height - 25) }, view, control)
    const distance = Math.hypot(point.x - position.x, point.y - position.y)
    return [{ element, point, weight: (element === previous ? 0.08 : 1) / (120 + distance) }]
  })
  if (!candidates.length || Math.random() < 0.2) {
    return { point: avoidControl(chooseWanderPoint(view, Math.random), view, control), element: null }
  }
  let choice = Math.random() * candidates.reduce((sum, candidate) => sum + candidate.weight, 0)
  for (const candidate of candidates) {
    choice -= candidate.weight
    if (choice <= 0) return candidate
  }
  return candidates[candidates.length - 1]
}

async function loadAtlas() {
  const metadataURL = new URL("/assets/moth-atlas.json", location.href)
  console.info("Moth: loading atlas", metadataURL.pathname)
  const response = await fetch(metadataURL)
  if (!response.ok) throw new Error(`Atlas metadata: HTTP ${response.status}`)
  const metadata = await response.json()
  const image = new Image()
  image.src = new URL(metadata.image, metadataURL).href
  await image.decode()
  const frames = new Map(metadata.frames.map((frame) => [frame.id, frame]))
  for (const name of ["flight", "turnRightToLeft", "turnLeftToRight", "read"]) {
    if (!Array.isArray(metadata.sequences[name]?.frames) || !metadata.sequences[name].frames.length ||
        metadata.sequences[name].frames.some((id) => !frames.has(id))) {
      throw new Error(`Invalid atlas sequence: ${name}`)
    }
  }
  console.info("Moth: atlas loaded")
  return { metadata, frames, image }
}

export async function startMoth() {
  const canvas = document.querySelector(".moth-sprite")
  const control = document.querySelector(".moth-control")
  if (!canvas || !control || canvas.dataset.started) return
  canvas.dataset.started = "true"

  let atlas
  try {
    atlas = await loadAtlas()
  } catch (error) {
    console.error("Moth: atlas load failed; control disabled", error)
    return
  }
  const context = canvas.getContext("2d")
  if (!context) {
    console.error("Moth: canvas unavailable; control disabled")
    return
  }
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  let enabled = true
  try { enabled = localStorage.getItem(STORAGE_KEY) !== "true" } catch { /* Storage is optional. */ }

  let position = { x: viewport().width - 90, y: Math.min(160, viewport().height / 2) }
  let facing = "left"
  let turn = null
  let state = "investigate"
  let elapsed = 0
  let duration = between(TUNING.investigate)
  let total = 0
  let readElapsed = 0
  let readingVisit = false
  let visits = 0
  let nextAway = Math.round(between(TUNING.visits))
  let previous = null
  let origin = position
  let destination = position
  let drift = between(TUNING.drift)
  let raf = 0
  let lastTime = null

  function faceToward(x) {
    if (Math.abs(x - position.x) > TUNING.directionThreshold) {
      const direction = flightDirection(position.x, x, facing)
      if (direction.turning) turn = { sequence: facing === "right" ? "turnRightToLeft" : "turnLeftToRight", elapsed: 0 }
      facing = direction.facing
    }
  }

  function beginTravel(point, away = false) {
    origin = { ...position }
    destination = point
    state = away ? "leaving" : "travel"
    elapsed = 0
    duration = between(TUNING.travel)
    faceToward(destination.x)
  }

  function nextDestination() {
    if (visits >= nextAway) {
      visits = 0
      nextAway = Math.round(between(TUNING.visits))
      const view = viewport()
      beginTravel({ x: Math.random() < 0.5 ? -100 : view.width + 100, y: clamp(position.y, 0, view.height) }, true)
      return
    }
    const next = readingDestination(position, previous, control)
    previous = next.element
    beginTravel(next.point)
  }

  function hasReadingTarget() {
    if (!previous || previous.isConnected === false) return false
    const rect = previous.getBoundingClientRect()
    const text = previous.textContent || previous.getAttribute("aria-label") || ""
    return isUsableTarget({ rect, text, hidden: hidden(previous) }, viewport())
  }

  function draw(still = false) {
    const width = window.innerWidth <= 560 ? 76 : 96
    const [cellWidth, cellHeight] = atlas.metadata.cell
    const height = width * cellHeight / cellWidth
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    const pixelWidth = Math.ceil(width * ratio)
    const pixelHeight = Math.ceil(height * ratio)
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const [pivotX, pivotY] = atlas.metadata.pivot
    const left = position.x - width * pivotX / cellWidth
    const top = position.y - height * pivotY / cellHeight
    canvas.style.transform = `translate(${left}px, ${top}px)`
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.clearRect(0, 0, width, height)
    context.save()
    const reading = !still && !turn && state === "investigate" && readingVisit && hasReadingTarget()
    const sequence = turn && !still ? atlas.metadata.sequences[turn.sequence]
      : reading ? atlas.metadata.sequences.read : atlas.metadata.sequences.flight
    const index = turn && !still
      ? Math.min(sequence.frames.length - 1, Math.floor(turn.elapsed / TUNING.turn * sequence.frames.length))
      : reading ? Math.floor(readElapsed / TUNING.read) % sequence.frames.length
        : still ? 0 : Math.floor(total / TUNING.frame) % sequence.frames.length
    const frame = atlas.frames.get(sequence.frames[index])
    const [sx, sy, sw, sh] = frame.atlasRect
    if (!turn && facing === "left") {
      context.translate(width, 0)
      context.scale(-1, 1)
    }
    context.drawImage(atlas.image, sx, sy, sw, sh, 0, 0, width, height)
    context.restore()
  }

  function tick(time) {
    raf = 0
    if (!shouldFly(enabled, motion.matches) || document.hidden) return
    const delta = lastTime === null ? 0 : Math.min(time - lastTime, TUNING.maxDelta)
    lastTime = time
    elapsed += delta
    total += delta
    if (state === "investigate" && readingVisit && !turn && hasReadingTarget()) readElapsed += delta
    if (turn) {
      turn.elapsed += delta
      if (turn.elapsed >= TUNING.turn) turn = null
    }
    if (state === "travel" || state === "leaving") {
      const progress = Math.min(1, elapsed / duration)
      const ease = progress * progress * (3 - 2 * progress)
      position = {
        x: origin.x + (destination.x - origin.x) * ease,
        y: origin.y + (destination.y - origin.y) * ease - Math.sin(progress * Math.PI) * 35,
      }
      if (progress === 1) {
        state = state === "leaving" ? "away" : "investigate"
        readingVisit = false
        if (state === "investigate") {
          visits++
          if (hasReadingTarget()) {
            readingVisit = Math.random() < 0.25
            const rect = previous.getBoundingClientRect()
            faceToward((rect.left + rect.right) / 2)
          }
        }
        readElapsed = 0
        elapsed = 0
        duration = between(state === "away" ? TUNING.away : TUNING.investigate)
        origin = { ...position }
        drift = between(TUNING.drift)
      }
    } else if (state === "investigate") {
      position = { x: origin.x + Math.sin(elapsed / 1800) * drift, y: origin.y + Math.sin(elapsed / 2400) * drift / 2 }
      if (elapsed >= duration) nextDestination()
    } else if (elapsed >= duration) {
      nextDestination()
    }
    draw()
    raf = requestAnimationFrame(tick)
  }

  function refresh() {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    lastTime = null
    canvas.hidden = !enabled
    const label = enabled ? "Hide moth" : "Show moth"
    control.setAttribute("aria-label", label)
    control.title = label
    control.setAttribute("aria-pressed", String(enabled))
    if (!enabled) return
    if (motion.matches) {
      position = { x: Math.max(25, viewport().width - 60), y: Math.min(150, viewport().height / 2) }
      origin = { ...position }
      state = "investigate"
      elapsed = 0
      turn = null
      draw(true)
    } else if (!document.hidden) {
      raf = requestAnimationFrame(tick)
    }
  }

  control.addEventListener("click", () => {
    enabled = !enabled
    try { localStorage.setItem(STORAGE_KEY, String(!enabled)) } catch { /* Storage is optional. */ }
    refresh()
  })
  motion.addEventListener("change", refresh)
  document.addEventListener("visibilitychange", refresh)
  window.addEventListener("resize", refresh)
  control.hidden = false
  refresh()
}
