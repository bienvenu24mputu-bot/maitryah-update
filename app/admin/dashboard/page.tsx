"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { usePermission } from "@/hooks/usePermission";
import { useLocale } from "@/context/LocaleContext";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrdersTrackingPanel } from "@/components/admin/OrdersTrackingPanel";
import { ProductTable } from "@/components/admin/ProductTable";
import { ContactSettingsPanel } from "@/components/admin/ContactSettingsPanel";
import { SuperAdminAccessPanel } from "@/components/admin/SuperAdminAccessPanel";
import {
  ADMIN_SECTIONS,
  PERMISSIONS,
  type AdminSectionId,
} from "@/lib/permissions";

export default function AdminDashboardPage() {
  const { loaded, isInitialized, isAuthenticated, session } = useAuth();
  const { can } = usePermission();
  const { t } = useLocale();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<AdminSectionId>("orders");

  useEffect(() => {
    if (!loaded) return;
    if (!isInitialized || !isAuthenticated) {
      router.replace("/admin");
    }
  }, [loaded, isInitialized, isAuthenticated, router]);

  useEffect(() => {
    if (!session) return;
    const first = Object.values(ADMIN_SECTIONS).find((s) =>
      can(s.permission)
    );
    if (first) setActiveSection(first.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id]);

  if (!loaded || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:text-stone-400">
        <p>Vérification…</p>
      </div>
    );
  }

  return (
    <AdminShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {activeSection === "orders" && can(PERMISSIONS.ORDERS_VIEW) && (
        <section>
          <h2 className="mb-6 text-lg font-semibold text-amber-950 dark:text-amber-100">
            {t("admin.section.orders")}
          </h2>
          <OrdersTrackingPanel />
        </section>
      )}

      {activeSection === "products" && can(PERMISSIONS.PRODUCTS_VIEW) && (
        <ProductTable />
      )}

      {activeSection === "settings" && can(PERMISSIONS.SETTINGS_MANAGE) && (
        <ContactSettingsPanel />
      )}

      {activeSection === "access" && can(PERMISSIONS.USERS_MANAGE) && (
        <SuperAdminAccessPanel />
      )}
    </AdminShell>
  );
}
