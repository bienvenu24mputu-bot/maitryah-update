"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AdminSetupForm } from "@/components/admin/AdminSetupForm";

export default function AdminPage() {
  const { loaded, isInitialized, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) return;
    if (isInitialized && isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [loaded, isInitialized, isAuthenticated, router]);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:text-stone-400">
        <p>Chargement…</p>
      </div>
    );
  }

  if (isInitialized && isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:text-stone-400">
        <p>Redirection vers le tableau de bord…</p>
      </div>
    );
  }

  const isSetup = !isInitialized;

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 pt-12 dark:bg-stone-950">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-lg dark:border-stone-700 dark:bg-stone-900">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-amber-800 text-xl font-bold text-white">
            MB
          </div>
          <h1 className="mt-4 text-2xl font-bold text-amber-950 dark:text-amber-100">
            {isSetup ? "Prête à configurer" : "Accès administration"}
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {isSetup
              ? "Créez votre compte Super Admin. Aucun identifiant n'est préconfiguré — c'est vous qui décidez."
              : "Saisissez les identifiants que vous avez définis lors de l'initialisation."}
          </p>
        </div>
        <AdminSetupForm mode={isSetup ? "setup" : "reauth"} />
      </div>
    </div>
  );
}
