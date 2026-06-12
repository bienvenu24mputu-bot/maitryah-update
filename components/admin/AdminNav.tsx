"use client";

import { ADMIN_SECTIONS, type AdminSectionId } from "@/lib/permissions";
import { usePermission } from "@/hooks/usePermission";
import { useLocale } from "@/context/LocaleContext";
import type { TranslationKey } from "@/lib/i18n/translations";

interface AdminNavProps {
  active: AdminSectionId;
  onChange: (section: AdminSectionId) => void;
}

export function AdminNav({ active, onChange }: AdminNavProps) {
  const { can } = usePermission();
  const { t } = useLocale();

  const visibleSections = Object.values(ADMIN_SECTIONS).filter((section) =>
    can(section.permission)
  );

  if (visibleSections.length <= 1) return null;

  return (
    <nav className="border-t border-stone-100 dark:border-stone-800">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
        {visibleSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onChange(section.id)}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              active === section.id
                ? "border-amber-700 text-amber-800 dark:text-amber-300"
                : "border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700 dark:text-stone-400"
            }`}
          >
            {t(section.labelKey as TranslationKey)}
          </button>
        ))}
      </div>
    </nav>
  );
}
