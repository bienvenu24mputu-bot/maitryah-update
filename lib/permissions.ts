/**
 * Système de permissions par rôle.
 *
 * Pour ajouter une nouvelle fonctionnalité protégée :
 * 1. Déclarez une permission dans PERMISSIONS
 * 2. Assignez-la au(x) rôle(s) dans ROLE_PERMISSIONS
 * 3. Utilisez usePermission() ou hasPermission() dans vos composants
 */

import type { AdminRole } from "./types";

/** Identifiants de permission — format "ressource:action" */
export const PERMISSIONS = {
  ORDERS_VIEW: "orders:view",
  ORDERS_UPDATE_STATUS: "orders:update_status",
  PRODUCTS_VIEW: "products:view",
  PRODUCTS_CREATE: "products:create",
  PRODUCTS_UPDATE: "products:update",
  PRODUCTS_DELETE: "products:delete",
  SETTINGS_MANAGE: "settings:manage",
  USERS_MANAGE: "users:manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/** Matrice rôle → permissions accordées */
const ROLE_PERMISSIONS: Record<AdminRole, readonly Permission[]> = {
  super_admin: Object.values(PERMISSIONS),
  admin: [PERMISSIONS.ORDERS_VIEW, PERMISSIONS.ORDERS_UPDATE_STATUS],
};

/** Vérifie qu'une valeur correspond à un rôle administrateur connu */
export function isValidAdminRole(role: unknown): role is AdminRole {
  return role === "super_admin" || role === "admin";
}

/** Vérifie si un rôle possède une permission donnée */
export function hasPermission(
  role: AdminRole | null | undefined,
  permission: Permission
): boolean {
  if (!isValidAdminRole(role)) return false;
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions.includes(permission);
}

/** Retourne toutes les permissions d'un rôle (tableau vide si rôle invalide) */
export function getPermissionsForRole(
  role: AdminRole | null | undefined
): readonly Permission[] {
  if (!isValidAdminRole(role)) return [];
  return ROLE_PERMISSIONS[role] ?? [];
}

/** Sections du tableau de bord admin visibles par rôle */
export const ADMIN_SECTIONS = {
  orders: {
    id: "orders",
    labelKey: "admin.section.orders",
    permission: PERMISSIONS.ORDERS_VIEW,
  },
  products: {
    id: "products",
    labelKey: "admin.section.products",
    permission: PERMISSIONS.PRODUCTS_VIEW,
  },
  settings: {
    id: "settings",
    labelKey: "admin.section.settings",
    permission: PERMISSIONS.SETTINGS_MANAGE,
  },
  access: {
    id: "access",
    labelKey: "admin.section.access",
    permission: PERMISSIONS.USERS_MANAGE,
  },
} as const;

export type AdminSectionId = keyof typeof ADMIN_SECTIONS;
