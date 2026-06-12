"use client";

import { useLocale } from "@/context/LocaleContext";
import type { TranslationKey } from "@/lib/i18n/translations";

const sections: TranslationKey[] = [
  "privacy.s1.title",
  "privacy.s1.body",
  "privacy.s2.title",
  "privacy.s2.body",
  "privacy.s3.title",
  "privacy.s3.body",
  "privacy.s4.title",
  "privacy.s4.body",
  "privacy.s5.title",
  "privacy.s5.body",
];

export default function ConfidentialitePage() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-amber-950 dark:text-amber-100">
        {t("privacy.title")}
      </h1>
      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
        {t("privacy.updated")}
      </p>
      <p className="mt-6 text-stone-700 dark:text-stone-300">{t("privacy.intro")}</p>

      <div className="mt-8 space-y-8">
        {Array.from({ length: sections.length / 2 }, (_, i) => (
          <section key={i}>
            <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200">
              {t(sections[i * 2])}
            </h2>
            <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-400">
              {t(sections[i * 2 + 1])}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        {t("privacy.contact")}
      </p>
    </div>
  );
}
