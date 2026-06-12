/**
 * Tableau de suivi complet des commandes clients.
 *
 * Fonctionnalités :
 * - Statistiques en temps réel (total, en attente, CA…)
 * - Filtre par statut et recherche par nom client
 * - Modification du statut (selon permission orders:update_status)
 */

"use client";

import { Fragment, useMemo, useState } from "react";
import { useOrders } from "@/context/OrdersContext";
import { usePermission } from "@/hooks/usePermission";
import {
  COMMANDE_STATUTS,
  COMMANDE_STATUT_COLORS,
  COMMANDE_STATUT_LABELS,
} from "@/lib/constants";
import { PERMISSIONS } from "@/lib/permissions";
import type { CommandeStatut } from "@/lib/types";
import { formatPrix } from "@/lib/utils";

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className={`rounded-xl border p-4 ${accent}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export function OrdersTrackingPanel() {
  const { commandes, updateStatut, stats } = useOrders();
  const { can } = usePermission();
  const canUpdateStatus = can(PERMISSIONS.ORDERS_UPDATE_STATUS);

  const [filtreStatut, setFiltreStatut] = useState<CommandeStatut | "tous">(
    "tous"
  );
  const [recherche, setRecherche] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const commandesFiltrees = useMemo(() => {
    return commandes.filter((cmd) => {
      const matchStatut =
        filtreStatut === "tous" || cmd.statut === filtreStatut;
      const matchRecherche =
        !recherche ||
        cmd.client.nom.toLowerCase().includes(recherche.toLowerCase()) ||
        cmd.client.telephone.includes(recherche) ||
        cmd.id.toLowerCase().includes(recherche.toLowerCase());
      return matchStatut && matchRecherche;
    });
  }, [commandes, filtreStatut, recherche]);

  return (
    <div className="space-y-6">
      {/* Statistiques agrégées */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Total commandes"
          value={stats.total}
          accent="border-stone-200 bg-white"
        />
        <StatCard
          label="En attente"
          value={stats.enAttente}
          accent="border-yellow-200 bg-yellow-50"
        />
        <StatCard
          label="Confirmées"
          value={stats.confirmees}
          accent="border-blue-200 bg-blue-50"
        />
        <StatCard
          label="Livrées"
          value={stats.livrees}
          accent="border-green-200 bg-green-50"
        />
        <StatCard
          label="Chiffre d'affaires"
          value={formatPrix(stats.chiffreAffaires)}
          accent="border-amber-200 bg-amber-50"
        />
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Rechercher (client, téléphone, n° commande)…"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="min-w-[200px] flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
        <select
          value={filtreStatut}
          onChange={(e) =>
            setFiltreStatut(e.target.value as CommandeStatut | "tous")
          }
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none"
        >
          <option value="tous">Tous les statuts</option>
          {COMMANDE_STATUTS.map((s) => (
            <option key={s} value={s}>
              {COMMANDE_STATUT_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau principal */}
      {commandesFiltrees.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white py-16 text-center">
          <p className="text-stone-500">
            {commandes.length === 0
              ? "Aucune commande enregistrée pour le moment"
              : "Aucun résultat pour ces filtres"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-amber-50 text-xs uppercase tracking-wide text-amber-800">
                <tr>
                  <th className="px-4 py-3">N° Commande</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Articles</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {commandesFiltrees.map((cmd) => (
                  <Fragment key={cmd.id}>
                    <tr className="hover:bg-stone-50/80">
                      <td className="px-4 py-3 font-mono text-xs text-stone-600">
                        {cmd.id.slice(0, 16)}…
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-500">
                        {new Date(cmd.date).toLocaleDateString("fr-CD", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-stone-800">
                          {cmd.client.nom}
                        </p>
                        <p className="text-xs text-stone-400">
                          {cmd.client.telephone}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                          {cmd.articles.length} article
                          {cmd.articles.length > 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-amber-900">
                        {formatPrix(cmd.total)}
                      </td>
                      <td className="px-4 py-3">
                        {canUpdateStatus ? (
                          <select
                            value={cmd.statut}
                            onChange={(e) =>
                              updateStatut(
                                cmd.id,
                                e.target.value as CommandeStatut
                              )
                            }
                            className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${COMMANDE_STATUT_COLORS[cmd.statut]}`}
                          >
                            {COMMANDE_STATUTS.map((s) => (
                              <option key={s} value={s}>
                                {COMMANDE_STATUT_LABELS[s]}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-medium ${COMMANDE_STATUT_COLORS[cmd.statut]}`}
                          >
                            {COMMANDE_STATUT_LABELS[cmd.statut]}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === cmd.id ? null : cmd.id
                            )
                          }
                          className="text-amber-700 hover:underline text-xs"
                        >
                          {expandedId === cmd.id ? "Masquer" : "Détails"}
                        </button>
                      </td>
                    </tr>
                    {expandedId === cmd.id && (
                      <tr className="bg-amber-50/30">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-xs font-medium uppercase text-stone-500">
                                Adresse de livraison
                              </p>
                              <p className="mt-1 text-sm text-stone-700">
                                {cmd.client.adresse}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase text-stone-500">
                                Détail des articles
                              </p>
                              <ul className="mt-1 space-y-1">
                                {cmd.articles.map((a, i) => (
                                  <li
                                    key={i}
                                    className="flex justify-between text-sm text-stone-600"
                                  >
                                    <span>
                                      {a.nom} × {a.quantite}
                                    </span>
                                    <span>
                                      {formatPrix(a.prixUnitaire * a.quantite)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-stone-100 bg-stone-50 px-4 py-2 text-xs text-stone-500">
            {commandesFiltrees.length} commande
            {commandesFiltrees.length > 1 ? "s" : ""} affichée
            {commandesFiltrees.length > 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
