"use client";

import { categories } from "@/data/categories";

interface CategoryNavProps {
  activeType: string;
  onTypeChange: (type: string) => void;
  counts: Record<string, number>;
}

export function CategoryNav({
  activeType,
  onTypeChange,
  counts,
}: CategoryNavProps) {
  const total = Object.values(counts).reduce((s, n) => s + n, 0);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTypeChange("")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          activeType === ""
            ? "bg-amber-700 text-white shadow-sm"
            : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-amber-50 dark:bg-stone-800 dark:text-stone-300 dark:ring-stone-700"
        }`}
      >
        Tout le catalogue ({total})
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onTypeChange(cat.type)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeType === cat.type
              ? "bg-amber-700 text-white shadow-sm"
              : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-amber-50 dark:bg-stone-800 dark:text-stone-300 dark:ring-stone-700"
          }`}
        >
          {cat.icon} {cat.label} ({counts[cat.type] ?? 0})
        </button>
      ))}
    </div>
  );
}
