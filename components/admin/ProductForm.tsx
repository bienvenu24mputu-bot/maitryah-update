"use client";

import { useState } from "react";
import { essences, types } from "@/data/bois";
import type { Produit, ProduitFormData } from "@/lib/types";
import { useProducts } from "@/context/ProductsContext";

interface ProductFormProps {
  produit?: Produit;
  onClose: () => void;
}

const emptyForm: ProduitFormData = {
  nom: "",
  essence: "Iroko",
  type: "Charpente",
  dimensions: { epaisseur: 0, largeur: 0, longueur: 0 },
  prix: 0,
  image: "https://placehold.co/600x400/8B4513/FFFFFF?text=Nouveau+Bois",
  stock: 0,
  uniteStock: "pièces",
};

export function ProductForm({ produit, onClose }: ProductFormProps) {
  const { addProduit, updateProduit } = useProducts();
  const [form, setForm] = useState<ProduitFormData>(
    produit ? { ...produit } : emptyForm
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (produit) {
      updateProduit(produit.id, form);
    } else {
      addProduit(form);
    }
    onClose();
  };

  const updateDim = (key: keyof typeof form.dimensions, value: number) => {
    setForm((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: value },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">Nom</label>
          <input
            type="text"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Essence</label>
          <select
            value={form.essence}
            onChange={(e) => setForm({ ...form, essence: e.target.value })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            {essences.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Épaisseur (mm)</label>
          <input
            type="number"
            value={form.dimensions.epaisseur || ""}
            onChange={(e) => updateDim("epaisseur", Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            required
            min={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Largeur (mm)</label>
          <input
            type="number"
            value={form.dimensions.largeur || ""}
            onChange={(e) => updateDim("largeur", Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            required
            min={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Longueur (mm)</label>
          <input
            type="number"
            value={form.dimensions.longueur || ""}
            onChange={(e) => updateDim("longueur", Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            required
            min={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Prix ($)</label>
          <input
            type="number"
            value={form.prix || ""}
            onChange={(e) => setForm({ ...form, prix: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            required
            min={0}
            step={0.01}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Stock</label>
          <input
            type="number"
            value={form.stock || ""}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            required
            min={0}
            step={0.1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Unité de stock</label>
          <select
            value={form.uniteStock}
            onChange={(e) =>
              setForm({ ...form, uniteStock: e.target.value as "pièces" | "m³" })
            }
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            <option value="pièces">Pièces</option>
            <option value="m³">m³</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">URL Image</label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-amber-700 px-5 py-2 text-sm font-medium text-white hover:bg-amber-800"
        >
          {produit ? "Mettre à jour" : "Ajouter le produit"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-stone-300 px-5 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
