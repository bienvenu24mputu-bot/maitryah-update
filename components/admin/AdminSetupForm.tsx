/**
 * Formulaire d'initialisation Super Admin (champs vides, aucun code par défaut).
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface AdminSetupFormProps {
  mode: "setup" | "reauth";
}

export function AdminSetupForm({ mode }: AdminSetupFormProps) {
  const { initializeSuperAdmin, authenticateSuperAdmin } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialKey, setSpecialKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const ok =
      mode === "setup"
        ? initializeSuperAdmin(username, password, specialKey)
        : authenticateSuperAdmin(username, password, specialKey);

    if (ok) {
      router.push("/admin/dashboard");
    } else {
      setError(
        mode === "setup"
          ? "Veuillez remplir tous les champs (mot de passe et clé : min. 4 caractères)."
          : "Identifiants incorrects. Vérifiez vos informations."
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="setup-username"
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          Nom d&apos;utilisateur
        </label>
        <input
          id="setup-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choisissez votre identifiant"
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          required
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="setup-password"
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          Mot de passe
        </label>
        <input
          id="setup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choisissez votre mot de passe"
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          required
          minLength={4}
          autoComplete="new-password"
        />
      </div>

      <div>
        <label
          htmlFor="setup-key"
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          Clé spéciale Super Admin
        </label>
        <input
          id="setup-key"
          type="password"
          value={specialKey}
          onChange={(e) => setSpecialKey(e.target.value)}
          placeholder="Choisissez votre clé secrète"
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          required
          minLength={4}
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-amber-800 py-3 font-medium text-white transition-colors hover:bg-amber-900 disabled:opacity-50"
      >
        {loading
          ? "Enregistrement…"
          : mode === "setup"
            ? "Créer mon compte et ouvrir le tableau de bord"
            : "Accéder au tableau de bord"}
      </button>
    </form>
  );
}
