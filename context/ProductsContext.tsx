"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { produitsInitiaux } from "@/data/bois";
import { STORAGE_KEYS } from "@/lib/constants";
import type { Produit, ProduitFormData } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface ProductsContextValue {
  produits: Produit[];
  addProduit: (data: ProduitFormData) => void;
  updateProduit: (id: string, data: ProduitFormData) => void;
  deleteProduit: (id: string) => void;
  getProduit: (id: string) => Produit | undefined;
  decrementStock: (id: string, quantite: number) => boolean;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUITS);
    if (stored) {
      try {
        setProduits(JSON.parse(stored));
      } catch {
        setProduits(produitsInitiaux as Produit[]);
      }
    } else {
      setProduits(produitsInitiaux as Produit[]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEYS.PRODUITS, JSON.stringify(produits));
    }
  }, [produits, loaded]);

  const addProduit = useCallback((data: ProduitFormData) => {
    const nouveau: Produit = {
      ...data,
      id: data.id ?? generateId("mbk"),
    } as Produit;
    setProduits((prev) => [...prev, nouveau]);
  }, []);

  const updateProduit = useCallback((id: string, data: ProduitFormData) => {
    setProduits((prev) =>
      prev.map((p) => (p.id === id ? { ...data, id } as Produit : p))
    );
  }, []);

  const deleteProduit = useCallback((id: string) => {
    setProduits((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProduit = useCallback(
    (id: string) => produits.find((p) => p.id === id),
    [produits]
  );

  const decrementStock = useCallback((id: string, quantite: number) => {
    let success = false;
    setProduits((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.stock < quantite) return p;
        success = true;
        return { ...p, stock: p.stock - quantite };
      })
    );
    return success;
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        produits,
        addProduit,
        updateProduit,
        deleteProduit,
        getProduit,
        decrementStock,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
