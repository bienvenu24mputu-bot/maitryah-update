"use client";

import Image from "next/image";
import { useState } from "react";
import type { Produit } from "@/lib/types";
import { formatDimensions, formatPrix } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  produit: Produit;
}

export function ProductCard({ produit }: ProductCardProps) {
  const { addToCart } = useCart();
  const [message, setMessage] = useState<string | null>(null);

  const handleAdd = () => {
    const result = addToCart(produit.id, 1);
    if (result.success) {
      setMessage("Ajouté au panier ✓");
      setTimeout(() => setMessage(null), 2000);
    } else {
      setMessage(result.message ?? "Erreur");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-amber-200/60 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-amber-100">
        <Image
          src={produit.image}
          alt={produit.nom}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <span className="absolute left-3 top-3 rounded-full bg-amber-800/90 px-2.5 py-0.5 text-xs font-medium text-amber-50">
          {produit.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
          {produit.essence}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-amber-950">
          {produit.nom}
        </h3>
        <p className="mt-1 text-sm text-stone-500">
          {formatDimensions(produit.dimensions)}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-xl font-bold text-amber-800">
              {formatPrix(produit.prix)}
            </p>
            <p className="text-xs text-stone-400">
              Stock : {produit.stock} {produit.uniteStock}
            </p>
          </div>
          <button
            onClick={handleAdd}
            disabled={produit.stock <= 0}
            className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {produit.stock <= 0 ? "Rupture" : "Ajouter"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-2 text-xs ${
              message.includes("✓") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </article>
  );
}
