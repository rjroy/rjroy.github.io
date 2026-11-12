import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  chooseWanderPoint,
  flightDirection,
  isUsableTarget,
  shouldFly,
} from "../src/moth/behavior.mjs"

// Geometry is in viewport coordinates. The caller resolves DOM visibility,
// including hidden ancestors, into the target's hidden flag.
const viewport = { width: 1000, height: 700 }
const target = {
  text: "A heading",
  hidden: false,
  rect: { left: 20, top: 30, right: 200, bottom: 60 },
}

describe("reading targets", () => {
  it("accepts visible, nonempty content, including partially visible content", () => {
    assert.equal(isUsableTarget(target, viewport), true)
    assert.equal(
      isUsableTarget({ ...target, rect: { left: -20, top: 30, right: 10, bottom: 60 } }, viewport),
      true,
    )
  })

  it("rejects hidden, whitespace-only, zero-area, and offscreen content", () => {
    for (const candidate of [
      { ...target, hidden: true },
      { ...target, text: " \n\t" },
      { ...target, rect: { left: 20, top: 30, right: 20, bottom: 60 } },
      { ...target, rect: { left: 1001, top: 30, right: 1200, bottom: 60 } },
      { ...target, rect: { left: 20, top: -50, right: 200, bottom: -1 } },
    ]) {
      assert.equal(isUsableTarget(candidate, viewport), false)
    }
  })
})

describe("wandering", () => {
  it("uses injected randomness for mostly onscreen destinations with occasional excursions", () => {
    let state = 17
    const random = () => {
      state = (state * 16807) % 2147483647
      return (state - 1) / 2147483646
    }
    const points = Array.from({ length: 500 }, () => chooseWanderPoint(viewport, random))
    assert.ok(points.every((point) => point && Number.isFinite(point.x) && Number.isFinite(point.y)))
    const onscreen = points.filter(
      ({ x, y }) => x >= 0 && x <= viewport.width && y >= 0 && y <= viewport.height,
    ).length
    assert.ok(onscreen > points.length / 2, "destinations should favor the viewport")
    assert.ok(onscreen < points.length, "some destinations should be offscreen")
    assert.ok(new Set(points.map(({ x, y }) => `${x},${y}`)).size > 1)
  })
})

describe("direction and motion gating", () => {
  it("faces the destination and signals turns in both directions", () => {
    assert.deepEqual(flightDirection(100, 200, "right"), { facing: "right", turning: false })
    assert.deepEqual(flightDirection(200, 100, "right"), { facing: "left", turning: true })
    assert.deepEqual(flightDirection(200, 100, "left"), { facing: "left", turning: false })
    assert.deepEqual(flightDirection(100, 200, "left"), { facing: "right", turning: true })
    assert.deepEqual(flightDirection(100, 100, "left"), { facing: "left", turning: false })
  })

  it("flies only when enabled and motion is not reduced", () => {
    assert.equal(shouldFly(true, false), true)
    assert.equal(shouldFly(false, false), false)
    assert.equal(shouldFly(true, true), false)
    assert.equal(shouldFly(false, true), false)
  })
})
