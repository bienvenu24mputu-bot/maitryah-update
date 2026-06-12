"use client";

import { essences, types } from "@/data/bois";

interface ProductFiltersProps {
  essenceFilter: string;
  typeFilter: string;
  onEssenceChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  resultCount: number;
}

export function ProductFilters({
  essenceFilter,
  typeFilter,
  onEssenceChange,
  onTypeChange,
  resultCount,
}: ProductFiltersProps) {
  return (
    <div className="rounded-xl border border-amber-200/60 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <h2 className="text-lg font-semibold text-amber-950 dark:text-amber-100">Filtres</h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        {resultCount} produit{resultCount !== 1 ? "s" : ""} trouvé
        {resultCount !== 1 ? "s" : ""}
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="essence-filter"
            className="block text-sm font-medium text-stone-700"
          >
            Essence de bois
          </label>
          <select
            id="essence-filter"
            value={essenceFilter}
            onChange={(e) => onEssenceChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          >
            <option value="">Toutes les essences</option>
            {essences.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="type-filter"
            className="block text-sm font-medium text-stone-700"
          >
            Type de produit
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          >
            <option value="">Tous les types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {(essenceFilter || typeFilter) && (
          <button
            onClick={() => {
              onEssenceChange("");
              onTypeChange("");
            }}
            className="text-sm text-amber-700 hover:text-amber-900 hover:underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>
    </div>
  );
}
