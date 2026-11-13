import assert from "node:assert/strict"
import { it } from "node:test"
import { startMoth } from "../src/moth/runtime.mjs"

it("renders above buttons and remains stationary under reduced motion", async (t) => {
  const draws = []
  const clears = []
  let path = []
  let clips = []
  const context = {
    setTransform() {}, clearRect(...args) { clears.push(args) }, save() { clips = [] }, restore() {},
    beginPath() { path = [] },
    rect(...args) { path.push(args) },
    clip() { clips.push(path) },
    translate() {}, scale() {},
    drawImage(...args) { draws.push({ frame: args.slice(1, 5), clips: [...clips] }) },
  }
  const canvas = {
    dataset: {}, style: {}, hidden: true,
    getContext: () => context,
  }
  const control = new EventTarget()
  control.hidden = true
  const icon = { nodeName: "svg" }
  const attributes = new Map()
  control.childNodes = [icon]
  control.setAttribute = (name, value) => attributes.set(name, String(value))
  control.getAttribute = (name) => attributes.get(name) ?? null
  Object.defineProperty(control, "textContent", {
    get: () => control.childNodes.map((node) => node.textContent || "").join(""),
    set: (value) => { control.childNodes = [{ textContent: String(value) }] },
  })
  control.getBoundingClientRect = () => ({ left: 0, top: 750, right: 100, bottom: 794, width: 100, height: 44 })
  let scrollOffset = 0
  const button = { getBoundingClientRect: () => {
    const match = canvas.style.transform?.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)
    const left = Number(match?.[1] ?? 0) + 10
    const top = Number(match?.[2] ?? 0) + 10 + scrollOffset
    return { left, top, right: left + 30, bottom: top + 20, width: 30, height: 20 }
  } }
  const document = new EventTarget()
  document.hidden = false
  document.querySelector = (selector) => selector === ".moth-sprite" ? canvas : control
  document.querySelectorAll = () => [button, control]
  const window = new EventTarget()
  window.innerWidth = 320
  window.innerHeight = 800
  window.devicePixelRatio = 1
  const motion = new EventTarget()
  motion.matches = true
  window.matchMedia = () => motion

  const frames = new Map()
  let nextFrame = 0
  const metadata = {
    image: "fixture.webp", cell: [100, 100], pivot: [50, 50],
    frames: [{ id: "still", atlasRect: [0, 0, 100, 100] }],
    sequences: Object.fromEntries(["flight", "turnRightToLeft", "turnLeftToRight", "read"].map(
      (name) => [name, { frames: ["still"] }],
    )),
  }
  const globals = {
    document, window,
    location: { href: "https://example.test/projects/" },
    localStorage: { getItem: () => null, setItem() {} },
    fetch: async () => ({ ok: true, json: async () => metadata }),
    Image: class { async decode() {} },
    requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: (id) => frames.delete(id),
  }
  window.requestAnimationFrame = globals.requestAnimationFrame
  window.cancelAnimationFrame = globals.cancelAnimationFrame
  for (const [name, value] of Object.entries(globals)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, name)
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value })
    t.after(() => original ? Object.defineProperty(globalThis, name, original) : delete globalThis[name])
  }

  t.mock.method(Math, "random", () => 0.5)
  await startMoth()
  assert.equal(canvas.hidden, false)
  assert.equal(draws.length, 1, "fixture must start with a static sprite")
  assert.equal(frames.size, 0, "reduced motion must not start a continuous animation")
  const initialTransform = canvas.style.transform
  const initialFrame = draws[0].frame
  await t.test("does not cut out the overlapping button from the sprite", () => {
    assert.deepEqual(draws[0].clips, [], "button regions must not clip the sprite")
    assert.ok(clears.every(([x, y, width, height]) =>
      x === 0 && y === 0 && width === parseFloat(canvas.style.width) && height === parseFloat(canvas.style.height),
    ), "only the full canvas may be cleared")
  })

  await t.test("scrolling does not schedule a redraw or animate the still moth", () => {
    scrollOffset = 30
    document.dispatchEvent(new Event("scroll"))
    window.dispatchEvent(new Event("scroll"))
    assert.equal(frames.size, 0, "scrolling must not schedule a frame")
    assert.equal(draws.length, 1, "scrolling must not redraw the static sprite")
    assert.equal(canvas.style.transform, initialTransform, "scrolling must not move the moth")
    assert.deepEqual(draws.at(-1).frame, initialFrame, "scrolling must not advance the sprite frame")
  })

  await t.test("preserves the icon while updating Hide/Show accessible labels and state", () => {
    const assertControl = (visible) => {
      const label = visible ? "Hide moth" : "Show moth"
      assert.ok(control.childNodes.includes(icon), "visibility updates must not replace the SVG icon")
      assert.equal(control.getAttribute("aria-label"), label)
      assert.equal(control.title, label)
      assert.equal(control.getAttribute("aria-pressed"), String(visible))
      assert.equal(canvas.hidden, !visible)
    }
    assertControl(true)
    control.dispatchEvent(new Event("click"))
    assertControl(false)
    control.dispatchEvent(new Event("click"))
    assertControl(true)
  })

  await t.test("a top-bar control does not deflect reading destinations below it", () => {
    window.innerWidth = 1000
    control.getBoundingClientRect = () => ({
      left: 800, top: 10, right: 896, bottom: 54, width: 96, height: 44,
    })
    const heading = {
      textContent: "Fixture heading",
      closest: () => null,
      checkVisibility: () => true,
      getBoundingClientRect: () => ({ left: 200, top: 300, right: 400, bottom: 340 }),
    }
    document.querySelectorAll = () => [heading]
    motion.matches = false
    motion.dispatchEvent(new Event("change"))

    // The test owns the clock and RNG: six seconds of attention, three of
    // travel, then two seconds hovering beside the fixture heading.
    for (let time = 0; time <= 11000; time += 50) {
      const [id, callback] = frames.entries().next().value
      frames.delete(id)
      callback(time)
    }
    const left = Number(canvas.style.transform.match(/translate\(([-\d.]+)px/)[1])
    const pivotX = left + parseFloat(canvas.style.width) / 2
    assert.ok(pivotX > 400 && pivotX < 500,
      `moth must investigate beside the heading, not the navigation control; x=${pivotX}`)
  })
})

for (const scenario of [
  { name: "rightward arrival to the right of the target", left: 880, right: 920, facing: "left", turn: 100 },
  { name: "leftward arrival to the left of the target", left: 850, right: 990, facing: "right", turn: 200 },
  { name: "arrival already facing the target", left: 200, right: 400, facing: "left", turn: null },
]) {
  it(`faces the selected heading after ${scenario.name}`, async (t) => {
    const draws = []
    let mirrored = false
    let time = 0
    const context = {
      setTransform() {}, clearRect() {}, save() { mirrored = false }, restore() {},
      translate() {}, scale(x) { mirrored = x < 0 },
      drawImage(_image, sourceX) { draws.push({ time, sourceX, mirrored }) },
    }
    const canvas = { dataset: {}, style: {}, hidden: true, getContext: () => context }
    const control = new EventTarget()
    control.setAttribute = () => {}
    control.getBoundingClientRect = () => ({ left: 0, right: 40, top: 0, bottom: 40 })
    const heading = {
      textContent: "A heading", closest: () => null, checkVisibility: () => true,
      getBoundingClientRect: () => ({ left: scenario.left, right: scenario.right, top: 300, bottom: 340 }),
    }
    const document = new EventTarget()
    document.hidden = false
    document.querySelector = (selector) => selector === ".moth-sprite" ? canvas : control
    document.querySelectorAll = () => [heading]
    const window = new EventTarget()
    Object.assign(window, { innerWidth: 1000, innerHeight: 800, devicePixelRatio: 1 })
    const motion = new EventTarget()
    motion.matches = false
    window.matchMedia = () => motion
    const frames = new Map()
    let nextFrame = 0
    const metadata = {
      image: "fixture.webp", cell: [100, 100], pivot: [50, 50],
      frames: [
        { id: "flight", atlasRect: [0, 0, 100, 100] },
        { id: "right-left", atlasRect: [100, 0, 100, 100] },
        { id: "left-right", atlasRect: [200, 0, 100, 100] },
        { id: "read", atlasRect: [300, 0, 100, 100] },
      ],
      sequences: {
        flight: { frames: ["flight"] },
        turnRightToLeft: { frames: ["right-left"] },
        turnLeftToRight: { frames: ["left-right"] },
        read: { frames: ["read"] },
      },
    }
    const globals = {
      document, window, location: { href: "https://example.test/" },
      localStorage: { getItem: () => null, setItem() {} },
      fetch: async () => ({ ok: true, json: async () => metadata }),
      Image: class { async decode() {} },
      requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame },
      cancelAnimationFrame: (id) => frames.delete(id),
    }
    for (const [name, value] of Object.entries(globals)) {
      const original = Object.getOwnPropertyDescriptor(globalThis, name)
      Object.defineProperty(globalThis, name, { configurable: true, writable: true, value })
      t.after(() => original ? Object.defineProperty(globalThis, name, original) : delete globalThis[name])
    }
    t.mock.method(Math, "random", () => 0.5)
    await startMoth()
    // With the controlled RNG, advance through the initial pause, travel, and
    // enough of the next pause for any attention turn to complete.
    for (time = 0; time <= 11000; time += 50) {
      const entry = frames.entries().next().value
      assert.ok(entry, "fixture must keep the flight loop running")
      const [id, callback] = entry
      frames.delete(id)
      callback(time)
    }
    const pivot = Number(canvas.style.transform.match(/translate\(([-\d.]+)px/)[1]) + parseFloat(canvas.style.width) / 2
    assert.ok(scenario.facing === "left" ? pivot > scenario.right : pivot < scenario.left,
      "fixture must hover on the intended side of the heading")
    const attentionDraws = draws.filter((draw) => draw.time >= 9000)
    assert.equal(attentionDraws.at(-1).sourceX, 300, "reading must follow the arrival turn")
    assert.equal(attentionDraws.at(-1).mirrored, scenario.facing === "left", "hover must face the heading")
    if (scenario.turn !== null) {
      assert.ok(attentionDraws.some((draw) => draw.sourceX === scenario.turn), "use the appropriate existing turn sequence")
    } else {
      assert.ok(attentionDraws.every((draw) => draw.sourceX === 300), "already facing the heading must not turn")
    }
  })
}

function readingFixture(t, readSequence = { frames: Array.from({ length: 8 }, (_, i) => `read-${i + 1}`) }) {
  const draws = []
  let time = 0
  const context = {
    setTransform() {}, clearRect() {}, save() {}, restore() {}, translate() {}, scale() {},
    drawImage(_image, sourceX) {
      const left = Number(canvas.style.transform.match(/translate\(([-\d.]+)px/)[1])
      draws.push({ time, sourceX, pivotX: left + parseFloat(canvas.style.width) / 2 })
    },
  }
  const canvas = { dataset: {}, style: {}, hidden: true, getContext: () => context }
  const control = new EventTarget()
  control.hidden = true
  control.setAttribute = () => {}
  control.getBoundingClientRect = () => ({ left: 0, right: 40, top: 0, bottom: 40 })
  const heading = {
    textContent: "A heading", closest: () => null, checkVisibility: () => true,
    getBoundingClientRect: () => ({ left: 200, right: 400, top: 300, bottom: 340 }),
  }
  const document = new EventTarget()
  document.hidden = false
  document.querySelector = (selector) => selector === ".moth-sprite" ? canvas : control
  document.querySelectorAll = () => [heading]
  const window = new EventTarget()
  Object.assign(window, { innerWidth: 1000, innerHeight: 800, devicePixelRatio: 1 })
  const motion = new EventTarget()
  motion.matches = false
  window.matchMedia = () => motion
  const frames = new Map()
  let nextFrame = 0
  const metadata = {
    image: "fixture.webp", cell: [100, 100], pivot: [50, 50],
    frames: [
      { id: "flight", atlasRect: [0, 0, 100, 100] },
      { id: "turn", atlasRect: [100, 0, 100, 100] },
      ...Array.from({ length: 8 }, (_, i) => ({ id: `read-${i + 1}`, atlasRect: [300 + i * 100, 0, 100, 100] })),
    ],
    sequences: {
      flight: { frames: ["flight"] },
      turnRightToLeft: { frames: ["turn"] },
      turnLeftToRight: { frames: ["turn"] },
      ...(readSequence === null ? {} : { read: readSequence }),
    },
  }
  const globals = {
    document, window, location: { href: "https://example.test/" },
    localStorage: { getItem: () => null, setItem() {} },
    fetch: async () => ({ ok: true, json: async () => metadata }),
    Image: class { async decode() {} },
    requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: (id) => frames.delete(id),
  }
  for (const [name, value] of Object.entries(globals)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, name)
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value })
    t.after(() => original ? Object.defineProperty(globalThis, name, original) : delete globalThis[name])
  }
  t.mock.method(Math, "random", () => 0.5)
  return {
    draws, frames, canvas, control, document,
    step(nextTime) {
      time = nextTime
      const entry = frames.entries().next().value
      assert.ok(entry, "fixture must have a scheduled animation frame")
      frames.delete(entry[0])
      entry[1](time)
    },
  }
}

it("reads in order at a target, pauses at endpoints, and flies on departure", async (t) => {
  const fixture = readingFixture(t)
  await startMoth()
  for (let time = 0; time <= 18000; time += 50) fixture.step(time)
  const { draws } = fixture
  assert.ok(draws.filter(({ time }) => time < 9000).every(({ sourceX }) => sourceX < 300),
    "initial idle and travel must not use reading poses")
  const hover = draws.filter(({ time }) => time >= 9000 && time < 15000)
  const runs = []
  for (const { sourceX } of hover) {
    if (runs.at(-1)?.sourceX === sourceX) runs.at(-1).count++
    else runs.push({ sourceX, count: 1 })
  }
  assert.deepEqual(runs.slice(0, 9).map(({ sourceX }) => sourceX),
    [300, 400, 500, 600, 700, 800, 900, 1000, 300],
    "each investigation starts at read-1 and loops forward through all eight poses")
  assert.ok(runs[3].count > runs[1].count && runs[7].count > runs[1].count,
    "both look endpoints must pause longer than an intermediate pose")
  assert.ok(draws.filter(({ time }) => time >= 15000 && time < 17500)
    .some(({ sourceX }) => sourceX === 0), "departure resumes flight without waiting for a read cycle")
})

it("does not fast-forward reading while the tab is hidden", async (t) => {
  const fixture = readingFixture(t)
  await startMoth()
  for (let time = 0; time <= 9800; time += 50) fixture.step(time)
  const before = fixture.draws.at(-1).sourceX
  assert.ok(before >= 300, "fixture must be reading at the target")
  fixture.document.hidden = true
  fixture.document.dispatchEvent(new Event("visibilitychange"))
  assert.equal(fixture.frames.size, 0)
  fixture.document.hidden = false
  fixture.document.dispatchEvent(new Event("visibilitychange"))
  fixture.step(30000)
  assert.equal(fixture.draws.at(-1).sourceX, before, "resumption must not skip reading poses")
})

it("does not read when wandering without a usable target", async (t) => {
  const fixture = readingFixture(t)
  fixture.document.querySelectorAll = () => []
  await startMoth()
  for (let time = 0; time <= 20000; time += 50) fixture.step(time)
  assert.ok(fixture.draws.every(({ sourceX }) => sourceX < 300),
    "targetless investigation must not use reading poses")
})

it("uses flight poses while leaving the viewport", async (t) => {
  const fixture = readingFixture(t)
  await startMoth()
  for (let time = 0; time <= 100000; time += 50) fixture.step(time)
  const offscreen = fixture.draws.filter(({ pivotX }) => pivotX > 1000)
  assert.ok(offscreen.length, "controlled visits must eventually leave the viewport")
  assert.ok(offscreen.some(({ sourceX }) => sourceX === 0),
    "offscreen travel must use flight poses")
  assert.ok(offscreen.some(({ sourceX }) => sourceX === 100),
    "the offscreen return turn must retain priority over flight")
  assert.ok(offscreen.every(({ sourceX }) => sourceX === 0 || sourceX === 100),
    "offscreen travel and turns must not use reading poses")
})

for (const [name, sequence] of [["missing", null], ["empty", { frames: [] }],
  ["unknown frame", { frames: ["not-a-frame"] }]]) {
  it(`disables the control for a ${name} read sequence`, async (t) => {
    const fixture = readingFixture(t, sequence)
    const errors = t.mock.method(console, "error", () => {})
    await startMoth()
    assert.equal(fixture.control.hidden, true)
    assert.equal(fixture.canvas.hidden, true)
    assert.equal(fixture.frames.size, 0)
    assert.equal(errors.mock.callCount(), 1)
    assert.match(String(errors.mock.calls[0].arguments[1]), /Invalid atlas sequence: read/)
  })
}
