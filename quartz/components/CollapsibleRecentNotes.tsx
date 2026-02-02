import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/collapsibleRecentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/collapsibleRecentNotes.inline"

interface Options {
  title?: string
  limit: number
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
  defaultCollapsed: boolean
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 5,
  showTags: false,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
  defaultCollapsed: false,
})

export default ((userOpts?: Partial<Options>) => {
  const CollapsibleRecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)

    return (
      <div
        class={classNames(displayClass, "collapsible-recent-notes")}
        data-collapsed={opts.defaultCollapsed}
      >
        <button type="button" class="recent-notes-toggle" aria-expanded={!opts.defaultCollapsed}>
          <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="5 8 14 8"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="recent-notes-content">
          <ul class="recent-ul overflow">
            {pages.slice(0, opts.limit).map((page) => {
              const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
              const tags = page.frontmatter?.tags ?? []

              return (
                <li class="recent-li">
                  <div class="section">
                    <div class="desc">
                      <h3>
                        <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                          {title}
                        </a>
                      </h3>
                    </div>
                    {page.dates && (
                      <p class="meta">
                        <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                      </p>
                    )}
                    {opts.showTags && (
                      <ul class="tags">
                        {tags.map((tag) => (
                          <li>
                            <a
                              class="internal tag-link"
                              href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                            >
                              {tag}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
            <li class="overflow-end" />
          </ul>
        </div>
      </div>
    )
  }

  CollapsibleRecentNotes.css = style
  CollapsibleRecentNotes.afterDOMLoaded = script
  return CollapsibleRecentNotes
}) satisfies QuartzComponentConstructor
