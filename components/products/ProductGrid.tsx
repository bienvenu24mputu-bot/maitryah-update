import type { Produit } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  produits: Produit[];
}

export function ProductGrid({ produits }: ProductGridProps) {
  if (produits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-amber-300 bg-amber-50/50 py-16 text-center">
        <p className="text-lg font-medium text-amber-800">
          Aucun produit ne correspond à vos filtres
        </p>
        <p className="mt-1 text-sm text-stone-500">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {produits.map((produit) => (
        <ProductCard key={produit.id} produit={produit} />
      ))}
    </div>
  );
}
