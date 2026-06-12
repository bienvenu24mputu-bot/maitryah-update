/**
 * Composant de garde d'accès basé sur les permissions.
 * Masque son contenu si l'utilisateur n'a pas la permission requise.
 */

"use client";

import type { ReactNode } from "react";
import { usePermission } from "@/hooks/usePermission";
import type { Permission } from "@/lib/permissions";

interface PermissionGateProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { can } = usePermission();
  return can(permission) ? <>{children}</> : <>{fallback}</>;
}
