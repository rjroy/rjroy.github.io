export function isUsableTarget(target, viewport) {
  const { left, top, right, bottom } = target.rect
  return (
    !target.hidden &&
    Boolean(target.text.trim()) &&
    right > left && bottom > top &&
    right > 0 && bottom > 0 && left < viewport.width && top < viewport.height
  )
}

export function chooseWanderPoint(viewport, random) {
  // Most destinations stay on screen; a minority venture past an edge.
  if (random() < 0.12) {
    const side = Math.floor(random() * 4)
    const margin = 40 + random() * 80
    if (side === 0) return { x: -margin, y: random() * viewport.height }
    if (side === 1) return { x: viewport.width + margin, y: random() * viewport.height }
    if (side === 2) return { x: random() * viewport.width, y: -margin }
    return { x: random() * viewport.width, y: viewport.height + margin }
  }
  return { x: random() * viewport.width, y: random() * viewport.height }
}

export function flightDirection(currentX, destinationX, facing) {
  const next = destinationX === currentX ? facing : destinationX > currentX ? "right" : "left"
  return { facing: next, turning: next !== facing }
}

export function shouldFly(enabled, reducedMotion) {
  return enabled && !reducedMotion
}
