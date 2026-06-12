"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { useProducts } from "@/context/ProductsContext";
import { useSettings } from "@/context/SettingsContext";
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  getWhatsAppNumber,
} from "@/lib/whatsapp";
import { formatPrix } from "@/lib/utils";

export function CartSummary() {
  const { itemsEnrichis, total, clearCart } = useCart();
  const { addCommande } = useOrders();
  const { decrementStock } = useProducts();
  const { settings } = useSettings();

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !telephone || !adresse) {
      setError("Veuillez remplir tous les champs avant de commander.");
      return;
    }

    const waNumber = getWhatsAppNumber(settings.whatsapp, settings.telephone);
    if (!waNumber) {
      setError("Numéro WhatsApp de l'entreprise non configuré.");
      return;
    }

    setLoading(true);
    setError(null);

    for (const item of itemsEnrichis) {
      const ok = decrementStock(item.produitId, item.quantite);
      if (!ok) {
        setError(`Stock insuffisant pour ${item.produit.nom}`);
        setLoading(false);
        return;
      }
    }

    addCommande({
      client: { nom, telephone, adresse },
      articles: itemsEnrichis.map((i) => ({
        produitId: i.produitId,
        nom: i.produit.nom,
        quantite: i.quantite,
        prixUnitaire: i.produit.prix,
      })),
      total,
    });

    const message = buildOrderMessage({
      entreprise: settings.nom,
      client: { nom, telephone, adresse },
      articles: itemsEnrichis.map((i) => ({
        nom: i.produit.nom,
        quantite: i.quantite,
        sousTotal: i.sousTotal,
        uniteStock: i.produit.uniteStock,
      })),
      total,
    });

    const url = buildWhatsAppUrl(waNumber, message);
    window.open(url, "_blank", "noopener,noreferrer");

    clearCart();
    setSuccess(true);
    setLoading(false);
  };

  if (itemsEnrichis.length === 0 && !success) {
    return (
      <div className="rounded-xl border border-amber-200/60 bg-white p-8 text-center shadow-sm dark:border-stone-700 dark:bg-stone-900">
        <p className="text-lg font-medium text-amber-800 dark:text-amber-200">
          Votre panier est vide
        </p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Parcourez notre catalogue pour ajouter des produits
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950/30">
        <p className="text-3xl">✓</p>
        <p className="mt-2 text-lg font-semibold text-green-800 dark:text-green-300">
          Commande envoyée sur WhatsApp !
        </p>
        <p className="mt-1 text-sm text-green-600 dark:text-green-400">
          Merci {nom}. Finalisez l&apos;envoi dans WhatsApp — nous vous
          répondrons rapidement.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200/60 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
      <h2 className="text-lg font-semibold text-amber-950 dark:text-amber-100">
        Récapitulatif
      </h2>

      <div className="mt-4 space-y-2 border-b border-stone-200 pb-4 dark:border-stone-700">
        {itemsEnrichis.map((item) => (
          <div key={item.produitId} className="flex justify-between text-sm">
            <span className="text-stone-600 dark:text-stone-400">
              {item.produit.nom} × {item.quantite}
            </span>
            <span className="font-medium">{formatPrix(item.sousTotal)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-xl font-bold text-amber-900 dark:text-amber-200">
        <span>Total</span>
        <span>{formatPrix(total)}</span>
      </div>

      <form onSubmit={handleWhatsAppOrder} className="mt-6 space-y-4">
        <h3 className="font-medium text-amber-950 dark:text-amber-100">
          Informations de livraison
        </h3>

        <input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          required
        />
        <input
          type="tel"
          placeholder="Téléphone (+243...)"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          required
        />
        <textarea
          placeholder="Adresse de livraison à Kinshasa"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          required
        />

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#20BD5A] disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {loading ? "Préparation..." : "Commander sur WhatsApp"}
        </button>

        <p className="text-center text-xs text-stone-400">
          Un message prérempli s&apos;ouvrira avec le détail de votre commande
        </p>
      </form>
    </div>
  );
}
