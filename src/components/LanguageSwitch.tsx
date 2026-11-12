"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  localeOf,
  localePath,
  LOCALE_NAMES,
  LOCALES,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { ChevronDownIcon } from "./icons";

/**
 * English, Marathi, Hindi.
 *
 * Real links, not a control that swaps text in place. Each language is its own
 * URL, so the choice can be shared, bookmarked and indexed — which is the
 * entire reason the locale is in the path rather than in a cookie.
 *
 * It points at the same page in the other language, computed from the current
 * path, so switching from /products lands on /mr/products rather than dropping
 * somebody on a home page they did not ask for.
 *
 * A plain <a>, deliberately, where the rest of the site uses next/link.
 *
 * Changing language is the one navigation that must not be client-side. Each
 * locale is a separately built copy of the site, with its own translated
 * markup and its own JavaScript state; handing the router a path in another
 * language asks it to swap the content underneath a tree it is still holding,
 * and what came back was a page half in each. A full load throws the old page
 * away and fetches the real, already-translated document. It costs one
 * request on a click that happens once a visit.
 */
export default function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const current = localeOf(pathname);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  /* Closes on a click anywhere else, and on Escape. A menu that only closes by
     choosing something is a menu you cannot change your mind about. */
  useEffect(() => {
    if (!open) return;

    const onDown = (event: MouseEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* From the dictionary, not a literal: this component is in the bundle every
     language shares, so English written here would redraw over the translation. */
  const label = getDictionary(current).nav.changeLanguage;

  return (
    <div ref={box} className={`relative flex flex-col items-center ${className}`}>
      {/* Said in the page's own language, so it reads to the visitor who is
          already here; the menu below names each language in itself. */}
      <span aria-hidden className="mb-2 text-[11px] leading-none whitespace-nowrap text-ink-700 sm:text-xs">
        {label}
      </span>
      <button
        suppressHydrationWarning
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`${label}: ${LOCALE_NAMES[current]}`}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-medium transition hover:border-brand-200 hover:text-brand-500"
      >
        {LOCALE_NAMES[current]}
        <ChevronDownIcon className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute top-full right-0 z-50 mt-1 min-w-[8rem] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lift"
        >
          {LOCALES.map((locale: Locale) => (
            <li key={locale} role="none">
              <a
                role="menuitem"
                href={localePath(pathname, locale)}
                hrefLang={locale}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm transition hover:bg-surface ${
                  locale === current ? "font-semibold text-brand-500" : "text-ink-900"
                }`}
              >
                {LOCALE_NAMES[locale]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
