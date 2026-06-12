"use client";

import Image from "next/image";
import type { Produit } from "@/lib/types";
import { formatDimensions, formatPrix } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface CartItemProps {
  produit: Produit;
  quantite: number;
  sousTotal: number;
}

export function CartItem({ produit, quantite, sousTotal }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = (newQty: number) => {
    const result = updateQuantity(produit.id, newQty);
    if (!result.success) {
      setError(result.message ?? "Erreur");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="flex gap-4 rounded-xl border border-amber-200/60 bg-white p-4 shadow-sm">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-amber-100">
        <Image
          src={produit.image}
          alt={produit.nom}
          fill
          className="object-cover"
          sizes="96px"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-amber-950">{produit.nom}</h3>
            <p className="text-sm text-stone-500">
              {produit.essence} · {formatDimensions(produit.dimensions)}
            </p>
            <p className="text-sm text-stone-400">
              {formatPrix(produit.prix)} / {produit.uniteStock === "m³" ? "m³" : "pièce"}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(produit.id)}
            className="text-sm text-red-500 hover:text-red-700"
            aria-label="Supprimer"
          >
            ✕
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(quantite - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-50"
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{quantite}</span>
            <button
              onClick={() => handleQuantityChange(quantite + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-50"
            >
              +
            </button>
            <span className="ml-2 text-xs text-stone-400">
              max {produit.stock} {produit.uniteStock}
            </span>
          </div>
          <p className="text-lg font-bold text-amber-800">
            {formatPrix(sousTotal)}
          </p>
        </div>

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
