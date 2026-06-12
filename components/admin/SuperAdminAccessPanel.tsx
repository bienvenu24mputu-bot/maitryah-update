/**
 * Configuration des accès Super Admin :
 * - Identifiant et mot de passe personnels
 * - Clé spéciale de connexion
 * - Gestion des autres administrateurs
 */

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { ROLE_LABELS } from "@/lib/constants";

const SUPER_ADMIN_ID = "admin-super";

export function SuperAdminAccessPanel() {
  const {
    admins,
    session,
    superAdminKey,
    updateSuperAdminCredentials,
    updateSuperAdminKey,
    updateAdminPassword,
    resetAdminPassword,
  } = useAuth();
  const { t } = useLocale();

  const superAdmin = admins.find((a) => a.id === SUPER_ADMIN_ID);

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (superAdmin) setUsername(superAdmin.username);
  }, [superAdmin?.username]);
  const [password, setPassword] = useState("");
  const [newKey, setNewKey] = useState("");
  const [adminPasswords, setAdminPasswords] = useState<Record<string, string>>(
    {}
  );
  const [message, setMessage] = useState<string | null>(null);

  const flash = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      flash("Veuillez saisir un mot de passe.");
      return;
    }
    const ok = updateSuperAdminCredentials(username, password);
    flash(ok ? t("admin.access.saved") : "Identifiants invalides (min. 4 caractères).");
    if (ok) setPassword("");
  };

  const handleUpdateKey = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = updateSuperAdminKey(newKey);
    flash(ok ? t("admin.access.keyUpdated") : "Clé invalide (min. 4 caractères).");
    if (ok) setNewKey("");
  };

  const otherAdmins = admins.filter((a) => a.role !== "super_admin");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-amber-950 dark:text-amber-100">
          {t("admin.access.title")}
        </h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          {t("admin.access.subtitle")}
        </p>
      </div>

      {message && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
          {message}
        </p>
      )}

      {/* Mon compte Super Admin */}
      <section className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
        <h3 className="font-semibold text-amber-900 dark:text-amber-200">
          {t("admin.access.myAccount")}
        </h3>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          {t("admin.access.myAccountDesc")}
        </p>
        <form onSubmit={handleSaveCredentials} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              {t("admin.access.username")}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              {t("admin.access.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 4 caractères"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
              required
              minLength={4}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-amber-700 px-5 py-2 text-sm font-medium text-white hover:bg-amber-800"
            >
              {t("admin.access.save")}
            </button>
          </div>
        </form>
      </section>

      {/* Clé spéciale */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
        <h3 className="font-semibold text-amber-950 dark:text-amber-100">
          {t("admin.access.specialKey")}
        </h3>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          {t("admin.access.specialKeyDesc")}
        </p>
        <p className="mt-2 font-mono text-xs text-stone-400">
          Clé actuelle : •••••••••••••••• ({superAdminKey.length} car.)
        </p>
        <form onSubmit={handleUpdateKey} className="mt-4 flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              {t("admin.access.newKey")}
            </label>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="19030120"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
              required
              minLength={4}
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
          >
            {t("admin.access.updateKey")}
          </button>
        </form>
      </section>

      {/* Autres admins */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
        <h3 className="font-semibold text-amber-950 dark:text-amber-100">
          {t("admin.access.otherAdmins")}
        </h3>
        <div className="mt-4 space-y-4">
          {otherAdmins.map((admin) => (
            <div
              key={admin.id}
              className="rounded-lg border border-stone-200 p-4 dark:border-stone-700"
            >
              <p className="font-medium text-stone-800 dark:text-stone-200">
                {admin.nom}
              </p>
              <p className="text-sm text-stone-500">@{admin.username}</p>
              <span className="mt-1 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-xs dark:bg-stone-800">
                {ROLE_LABELS[admin.role]}
              </span>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <input
                  type="password"
                  value={adminPasswords[admin.id] ?? ""}
                  onChange={(e) =>
                    setAdminPasswords({
                      ...adminPasswords,
                      [admin.id]: e.target.value,
                    })
                  }
                  placeholder="Nouveau mot de passe"
                  className="min-w-[180px] flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm dark:border-stone-600 dark:bg-stone-800"
                />
                <button
                  onClick={() => {
                    const pwd = adminPasswords[admin.id];
                    if (pwd && updateAdminPassword(admin.id, pwd)) {
                      flash(`Mot de passe de ${admin.nom} mis à jour ✓`);
                      setAdminPasswords({ ...adminPasswords, [admin.id]: "" });
                    }
                  }}
                  className="rounded-lg bg-amber-700 px-4 py-2 text-sm text-white hover:bg-amber-800"
                >
                  Mettre à jour
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Réinitialiser ${admin.nom} ?`)) {
                      resetAdminPassword(admin.id);
                      flash("Mot de passe réinitialisé ✓");
                    }
                  }}
                  className="rounded-lg border border-stone-300 px-4 py-2 text-sm dark:border-stone-600"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
