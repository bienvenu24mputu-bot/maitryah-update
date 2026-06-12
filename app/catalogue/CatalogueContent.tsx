"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";
import { CategoryNav } from "@/components/products/CategoryNav";
import { CatalogueSections } from "@/components/products/CatalogueSections";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/context/ProductsContext";
import { useLocale } from "@/context/LocaleContext";

export function CatalogueContent() {
  const { produits } = useProducts();
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") ?? "";

  const [essenceFilter, setEssenceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState(initialType);

  const filtered = useMemo(() => {
    return produits.filter((p) => {
      const matchEssence = !essenceFilter || p.essence === essenceFilter;
      const matchType = !typeFilter || p.type === typeFilter;
      return matchEssence && matchType;
    });
  }, [produits, essenceFilter, typeFilter]);

  const countsByType = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat.type] = produits.filter((p) => p.type === cat.type).length;
    }
    return counts;
  }, [produits]);

  const activeCategory = categories.find((c) => c.type === typeFilter);
  const showGrouped = !typeFilter && !essenceFilter;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-950 dark:text-amber-100">
          {t("catalogue.title")}
        </h1>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          {t("catalogue.subtitle")}
        </p>
      </div>

      <div className="mb-8">
        <CategoryNav
          activeType={typeFilter}
          onTypeChange={setTypeFilter}
          counts={countsByType}
        />
      </div>

      {activeCategory && (
        <div className="mb-6 rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            {activeCategory.icon} {activeCategory.label}
          </p>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            {activeCategory.description}
          </p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilters
            essenceFilter={essenceFilter}
            typeFilter={typeFilter}
            onEssenceChange={setEssenceFilter}
            onTypeChange={setTypeFilter}
            resultCount={filtered.length}
          />
        </aside>
        <div className="lg:col-span-3">
          {showGrouped ? (
            <CatalogueSections produits={produits} />
          ) : (
            <ProductGrid produits={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}
