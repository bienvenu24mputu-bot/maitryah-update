/**
 * Constantes centralisées du projet MAN BOIS KINSHASA.
 *
 * Centraliser ici les clés de stockage, labels et valeurs partagées
 * facilite les mises à jour sans parcourir tout le code.
 */

/** Clés localStorage / sessionStorage — préfixe "mbk_" pour éviter les collisions */
export const STORAGE_KEYS = {
  PRODUITS: "mbk_produits",
  PANIER: "mbk_panier",
  COMMANDES: "mbk_commandes",
  ADMINS: "mbk_admins",
  SETTINGS: "mbk_settings",
  SESSION: "mbk_admin_session",
  ADMIN_INITIALIZED: "mbk_admin_initialized",
  SUPER_ADMIN_KEY: "mbk_super_admin_key",
  LOCALE: "mbk_locale",
  THEME: "mbk_theme",
} as const;

export const LOCALES = ["fr", "ln", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  ln: "Lingala",
  en: "English",
};

/** Labels affichés pour les statuts de commande */
export const COMMANDE_STATUTS = [
  "en_attente",
  "confirmée",
  "livrée",
  "annulée",
] as const;

export const COMMANDE_STATUT_LABELS: Record<
  (typeof COMMANDE_STATUTS)[number],
  string
> = {
  en_attente: "En attente",
  confirmée: "Confirmée",
  livrée: "Livrée",
  annulée: "Annulée",
};

export const COMMANDE_STATUT_COLORS: Record<
  (typeof COMMANDE_STATUTS)[number],
  string
> = {
  en_attente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmée: "bg-blue-100 text-blue-800 border-blue-200",
  livrée: "bg-green-100 text-green-800 border-green-200",
  annulée: "bg-red-100 text-red-800 border-red-200",
};

/** Libellés des rôles affichés dans l'interface admin */
export const ROLE_LABELS = {
  super_admin: "Super Admin",
  admin: "Administrateur",
} as const;
