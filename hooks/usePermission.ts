/**
 * Hook utilitaire pour vérifier les permissions de l'utilisateur connecté.
 *
 * Usage :
 *   const { can, canAny } = usePermission();
 *   if (can(PERMISSIONS.PRODUCTS_DELETE)) { ... }
 */

"use client";

import { useAuth } from "@/context/AuthContext";
import { hasPermission, type Permission } from "@/lib/permissions";

export function usePermission() {
  const { session } = useAuth();

  const can = (permission: Permission): boolean =>
    hasPermission(session?.role, permission);

  const canAny = (permissions: Permission[]): boolean =>
    permissions.some((p) => can(p));

  const canAll = (permissions: Permission[]): boolean =>
    permissions.every((p) => can(p));

  return { can, canAny, canAll, role: session?.role ?? null };
}
