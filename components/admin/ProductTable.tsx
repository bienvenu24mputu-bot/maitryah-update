/**
 * Tableau de gestion du catalogue produits.
 * Actions conditionnées par les permissions du rôle connecté.
 */

"use client";

import { useState } from "react";
import type { Produit } from "@/lib/types";
import { formatDimensions, formatPrix } from "@/lib/utils";
import { useProducts } from "@/context/ProductsContext";
import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/lib/permissions";
import { ProductForm } from "./ProductForm";

export function ProductTable() {
  const { produits, deleteProduit } = useProducts();
  const { can } = usePermission();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Produit | null>(null);

  const canCreate = can(PERMISSIONS.PRODUCTS_CREATE);
  const canUpdate = can(PERMISSIONS.PRODUCTS_UPDATE);
  const canDelete = can(PERMISSIONS.PRODUCTS_DELETE);

  const handleEdit = (produit: Produit) => {
    setEditing(produit);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-amber-950">
          Catalogue ({produits.length} produits)
        </h2>
        {canCreate && (
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
          >
            + Ajouter un bois
          </button>
        )}
      </div>

      {showForm && ((editing && canUpdate) || (!editing && canCreate)) && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-5">
          <h3 className="mb-4 font-medium text-amber-900">
            {editing ? "Modifier le produit" : "Nouveau produit"}
          </h3>
          <ProductForm produit={editing ?? undefined} onClose={handleClose} />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-amber-50 text-xs uppercase text-amber-800">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Essence</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Dimensions</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th>
              {(canUpdate || canDelete) && (
                <th className="px-4 py-3">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {produits.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium">{p.nom}</td>
                <td className="px-4 py-3">{p.essence}</td>
                <td className="px-4 py-3">{p.type}</td>
                <td className="px-4 py-3 text-stone-500">
                  {formatDimensions(p.dimensions)}
                </td>
                <td className="px-4 py-3">{formatPrix(p.prix)}</td>
                <td className="px-4 py-3">
                  {p.stock} {p.uniteStock}
                </td>
                {(canUpdate || canDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {canUpdate && (
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-amber-700 hover:underline"
                        >
                          Modifier
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => {
                            if (confirm(`Supprimer "${p.nom}" ?`)) {
                              deleteProduit(p.id);
                            }
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
