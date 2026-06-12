/**
 * Contexte de gestion des commandes clients.
 * Toutes les commandes passées sur le site sont persistées ici.
 */

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
import { STORAGE_KEYS } from "@/lib/constants";
import type { Commande, CommandeStatut } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface OrdersContextValue {
  commandes: Commande[];
  addCommande: (commande: Omit<Commande, "id" | "date" | "statut">) => Commande;
  updateStatut: (id: string, statut: CommandeStatut) => void;
  /** Statistiques agrégées pour le tableau de suivi */
  stats: {
    total: number;
    enAttente: number;
    confirmees: number;
    livrees: number;
    annulees: number;
    chiffreAffaires: number;
  };
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.COMMANDES);
    if (stored) {
      try {
        setCommandes(JSON.parse(stored));
      } catch {
        setCommandes([]);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEYS.COMMANDES, JSON.stringify(commandes));
    }
  }, [commandes, loaded]);

  const addCommande = useCallback(
    (data: Omit<Commande, "id" | "date" | "statut">) => {
      const nouvelle: Commande = {
        ...data,
        id: generateId("cmd"),
        date: new Date().toISOString(),
        statut: "en_attente",
      };
      setCommandes((prev) => [nouvelle, ...prev]);
      return nouvelle;
    },
    []
  );

  const updateStatut = useCallback((id: string, statut: CommandeStatut) => {
    setCommandes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, statut } : c))
    );
  }, []);

  const stats = useMemo(() => {
    const actives = commandes.filter((c) => c.statut !== "annulée");
    return {
      total: commandes.length,
      enAttente: commandes.filter((c) => c.statut === "en_attente").length,
      confirmees: commandes.filter((c) => c.statut === "confirmée").length,
      livrees: commandes.filter((c) => c.statut === "livrée").length,
      annulees: commandes.filter((c) => c.statut === "annulée").length,
      chiffreAffaires: actives.reduce((sum, c) => sum + c.total, 0),
    };
  }, [commandes]);

  return (
    <OrdersContext.Provider
      value={{ commandes, addCommande, updateStatut, stats }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
