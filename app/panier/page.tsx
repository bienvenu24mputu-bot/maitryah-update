"use client";

import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

export default function PanierPage() {
  const { itemsEnrichis } = useCart();
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-amber-950 dark:text-amber-100">
        {t("cart.title")}
      </h1>
      <p className="mt-2 text-stone-500 dark:text-stone-400">
        {t("cart.subtitle")}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {itemsEnrichis.length > 0 ? (
            itemsEnrichis.map((item) => (
              <CartItem
                key={item.produitId}
                produit={item.produit}
                quantite={item.quantite}
                sousTotal={item.sousTotal}
              />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 py-16 text-center">
              <p className="text-lg font-medium text-amber-800 dark:text-amber-200">
                {t("cart.empty")}
              </p>
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
