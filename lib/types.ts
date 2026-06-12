/**
 * Types TypeScript partagés.
 * Ajoutez ici les interfaces de nouvelles entités (ex. fournisseurs, devis…).
 */

export interface Dimensions {
  epaisseur: number;
  largeur: number;
  longueur: number;
}

export interface Produit {
  id: string;
  nom: string;
  essence: string;
  type: string;
  dimensions: Dimensions;
  prix: number;
  image: string;
  stock: number;
  uniteStock: "pièces" | "m³";
}

export interface ArticlePanier {
  produitId: string;
  quantite: number;
}

export type CommandeStatut = "en_attente" | "confirmée" | "livrée" | "annulée";

export interface Commande {
  id: string;
  date: string;
  client: {
    nom: string;
    telephone: string;
    adresse: string;
  };
  articles: {
    produitId: string;
    nom: string;
    quantite: number;
    prixUnitaire: number;
  }[];
  total: number;
  statut: CommandeStatut;
}

export type ProduitFormData = Omit<Produit, "id"> & { id?: string };

/** Rôles administrateur — super_admin = contrôle total, admin = droits limités */
export type AdminRole = "super_admin" | "admin";

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  role: AdminRole;
  nom: string;
  email: string;
}

/** Session admin stockée après connexion (sans mot de passe) */
export interface AdminSession {
  id: string;
  username: string;
  role: AdminRole;
  nom: string;
}

/** Coordonnées de l'entreprise affichées sur le site public */
export interface EntrepriseSettings {
  nom: string;
  adresse: string;
  telephone: string;
  /** Numéro WhatsApp commandes (ex. 243810000000) — prioritaire pour le bouton Commander */
  whatsapp: string;
  email: string;
  description: string;
}
