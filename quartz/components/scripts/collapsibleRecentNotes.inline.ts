const STORAGE_KEY = "recent-notes-collapsed"

function toggleRecentNotes(this: HTMLElement) {
  const container = this.closest(".collapsible-recent-notes") as HTMLElement
  if (!container) return

  const isCollapsed = container.classList.toggle("collapsed")
  this.setAttribute("aria-expanded", (!isCollapsed).toString())

  try {
    localStorage.setItem(STORAGE_KEY, isCollapsed.toString())
  } catch {
    // Private browsing or quota exceeded - ignore
  }
}

function setupCollapsibleRecentNotes() {
  const containers = document.querySelectorAll(
    ".collapsible-recent-notes",
  ) as NodeListOf<HTMLElement>

  for (const container of containers) {
    const button = container.querySelector(".recent-notes-toggle") as HTMLButtonElement
    if (!button) continue

    // Restore state from localStorage
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState !== null) {
        const isCollapsed = savedState === "true"
        if (isCollapsed) {
          container.classList.add("collapsed")
          button.setAttribute("aria-expanded", "false")
        } else {
          container.classList.remove("collapsed")
          button.setAttribute("aria-expanded", "true")
        }
      } else {
        // Use default from data attribute
        const defaultCollapsed = container.dataset.collapsed === "true"
        if (defaultCollapsed) {
          container.classList.add("collapsed")
          button.setAttribute("aria-expanded", "false")
        }
      }
    } catch {
      // localStorage not available - use default state
    }

    button.addEventListener("click", toggleRecentNotes)
    window.addCleanup(() => button.removeEventListener("click", toggleRecentNotes))
  }
}

document.addEventListener("nav", setupCollapsibleRecentNotes)
