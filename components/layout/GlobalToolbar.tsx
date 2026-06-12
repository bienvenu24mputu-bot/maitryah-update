/**
 * Barre globale : langue (FR / Lingala / EN) + thème clair/sombre.
 * Visible sur toutes les pages, y compris l'admin.
 */

"use client";

import { LOCALE_LABELS, useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { LOCALES, type Locale } from "@/lib/constants";

export function GlobalToolbar() {
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed right-3 top-3 z-[100] flex items-center gap-2 sm:right-4 sm:top-4">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label="Langue"
        className="rounded-lg border border-stone-300 bg-white/95 px-2 py-1.5 text-xs font-medium text-stone-700 shadow-sm backdrop-blur focus:border-amber-600 focus:outline-none dark:border-stone-600 dark:bg-stone-900/95 dark:text-stone-200"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? t("theme.dark") : t("theme.light")}
        title={theme === "light" ? t("theme.dark") : t("theme.light")}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 bg-white/95 text-base shadow-sm backdrop-blur transition-colors hover:bg-amber-50 dark:border-stone-600 dark:bg-stone-900/95 dark:hover:bg-stone-800"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
