"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ArticlePanier, Produit } from "@/lib/types";
import { useProducts } from "./ProductsContext";

import { STORAGE_KEYS } from "@/lib/constants";

interface CartItemEnrichi extends ArticlePanier {
  produit: Produit;
  sousTotal: number;
}

interface CartContextValue {
  items: ArticlePanier[];
  itemsEnrichis: CartItemEnrichi[];
  total: number;
  nombreArticles: number;
  addToCart: (produitId: string, quantite?: number) => { success: boolean; message?: string };
  removeFromCart: (produitId: string) => void;
  updateQuantity: (produitId: string, quantite: number) => { success: boolean; message?: string };
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { getProduit } = useProducts();
  const [items, setItems] = useState<ArticlePanier[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PANIER);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEYS.PANIER, JSON.stringify(items));
    }
  }, [items, loaded]);

  const getStockDisponible = useCallback(
    (produitId: string, excludeCurrent = 0) => {
      const produit = getProduit(produitId);
      if (!produit) return 0;
      const inCart = items.find((i) => i.produitId === produitId)?.quantite ?? 0;
      return produit.stock - inCart + excludeCurrent;
    },
    [getProduit, items]
  );

  const addToCart = useCallback(
    (produitId: string, quantite = 1) => {
      const produit = getProduit(produitId);
      if (!produit) return { success: false, message: "Produit introuvable." };

      const disponible = getStockDisponible(produitId);
      if (quantite > disponible) {
        return {
          success: false,
          message: `Stock insuffisant. Disponible : ${disponible} ${produit.uniteStock}`,
        };
      }

      setItems((prev) => {
        const existing = prev.find((i) => i.produitId === produitId);
        if (existing) {
          return prev.map((i) =>
            i.produitId === produitId
              ? { ...i, quantite: i.quantite + quantite }
              : i
          );
        }
        return [...prev, { produitId, quantite }];
      });

      return { success: true };
    },
    [getProduit, getStockDisponible]
  );

  const removeFromCart = useCallback((produitId: string) => {
    setItems((prev) => prev.filter((i) => i.produitId !== produitId));
  }, []);

  const updateQuantity = useCallback(
    (produitId: string, quantite: number) => {
      if (quantite <= 0) {
        removeFromCart(produitId);
        return { success: true };
      }

      const produit = getProduit(produitId);
      if (!produit) return { success: false, message: "Produit introuvable." };

      const current = items.find((i) => i.produitId === produitId)?.quantite ?? 0;
      const disponible = getStockDisponible(produitId, current);

      if (quantite > disponible) {
        return {
          success: false,
          message: `Stock insuffisant. Maximum : ${disponible} ${produit.uniteStock}`,
        };
      }

      setItems((prev) =>
        prev.map((i) =>
          i.produitId === produitId ? { ...i, quantite } : i
        )
      );
      return { success: true };
    },
    [getProduit, getStockDisponible, items, removeFromCart]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemsEnrichis = useMemo(() => {
    return items
      .map((item) => {
        const produit = getProduit(item.produitId);
        if (!produit) return null;
        return {
          ...item,
          produit,
          sousTotal: produit.prix * item.quantite,
        };
      })
      .filter((i): i is CartItemEnrichi => i !== null);
  }, [items, getProduit]);

  const total = useMemo(
    () => itemsEnrichis.reduce((sum, i) => sum + i.sousTotal, 0),
    [itemsEnrichis]
  );

  const nombreArticles = useMemo(
    () => items.reduce((sum, i) => sum + i.quantite, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemsEnrichis,
        total,
        nombreArticles,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
