"use client";

import { categories } from "@/data/categories";
import type { Produit } from "@/lib/types";
import { ProductGrid } from "./ProductGrid";

interface CatalogueSectionsProps {
  produits: Produit[];
}

export function CatalogueSections({ produits }: CatalogueSectionsProps) {
  return (
    <div className="space-y-12">
      {categories.map((cat) => {
        const sectionProducts = produits.filter((p) => p.type === cat.type);
        if (sectionProducts.length === 0) return null;

        return (
          <section key={cat.id} id={cat.id}>
            <div className="mb-6 border-b border-amber-200/60 pb-4 dark:border-amber-900/40">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-amber-950 dark:text-amber-100">
                    {cat.label}
                  </h2>
                  <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                    {cat.description}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-stone-400">
                {sectionProducts.length} produit
                {sectionProducts.length > 1 ? "s" : ""}
              </p>
            </div>
            <ProductGrid produits={sectionProducts} />
          </section>
        );
      })}
    </div>
  );
}
