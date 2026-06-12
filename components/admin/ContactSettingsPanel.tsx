/**
 * Panneau de gestion des coordonnées entreprise.
 * Réservé au Super Admin — modifie les infos affichées sur le site public.
 */

"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import type { EntrepriseSettings } from "@/lib/types";

export function ContactSettingsPanel() {
  const { settings, updateSettings } = useSettings();
  const [form, setForm] = useState<EntrepriseSettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (
    label: string,
    key: keyof EntrepriseSettings,
    multiline = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      {multiline ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={3}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
      )}
    </div>
  );

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-amber-950">
        Coordonnées de l&apos;entreprise
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        Ces informations sont affichées sur le pied de page et la page
        d&apos;accueil du site public.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {field("Nom de l'entreprise", "nom")}
        {field("Adresse", "adresse")}
        {field("Téléphone", "telephone")}
        {field("WhatsApp commandes (ex. 243810000000)", "whatsapp")}
        {field("Email", "email")}
        {field("Description", "description", true)}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-amber-700 px-5 py-2 text-sm font-medium text-white hover:bg-amber-800"
          >
            Enregistrer les modifications
          </button>
          {saved && (
            <span className="text-sm text-green-600">
              Coordonnées mises à jour ✓
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
