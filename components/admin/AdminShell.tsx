"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { AdminNav } from "./AdminNav";
import { ROLE_LABELS } from "@/lib/constants";
import type { AdminSectionId } from "@/lib/permissions";

interface AdminShellProps {
  activeSection: AdminSectionId;
  onSectionChange: (section: AdminSectionId) => void;
  children: React.ReactNode;
}

export function AdminShell({
  activeSection,
  onSectionChange,
  children,
}: AdminShellProps) {
  const { session, logout } = useAuth();
  const { t } = useLocale();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 pr-28 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-amber-950 dark:text-amber-100">
              {t("admin.dashboard.title")}
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              MAN BOIS KINSHASA —{" "}
              {session ? ROLE_LABELS[session.role] : "Admin"}
              {session && (
                <span className="text-stone-400"> · {session.nom}</span>
              )}
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/admin");
            }}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {t("admin.logout")}
          </button>
        </div>
        <AdminNav active={activeSection} onChange={onSectionChange} />
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 pr-4 sm:px-6">{children}</div>
    </div>
  );
}
