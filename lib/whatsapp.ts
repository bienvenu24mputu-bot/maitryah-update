/**
 * Utilitaires WhatsApp pour les commandes clients.
 * Format wa.me : https://wa.me/243XXXXXXXXX?text=...
 */

import { formatPrix } from "./utils";

export function normalizeWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function getWhatsAppNumber(
  settingsWhatsapp: string,
  settingsTelephone: string
): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (fromEnv) return normalizeWhatsAppNumber(fromEnv);
  if (settingsWhatsapp) return normalizeWhatsAppNumber(settingsWhatsapp);
  return normalizeWhatsAppNumber(settingsTelephone);
}

interface OrderLine {
  nom: string;
  quantite: number;
  sousTotal: number;
  uniteStock?: string;
}

interface OrderMessageParams {
  entreprise: string;
  client: { nom: string; telephone: string; adresse: string };
  articles: OrderLine[];
  total: number;
}

/** Construit le message texte envoyé sur WhatsApp */
export function buildOrderMessage({
  entreprise,
  client,
  articles,
  total,
}: OrderMessageParams): string {
  const lines = articles.map(
    (a) =>
      `• ${a.nom} × ${a.quantite}${a.uniteStock ? ` ${a.uniteStock}` : ""} — ${formatPrix(a.sousTotal)}`
  );

  return [
    `🪵 *NOUVELLE COMMANDE — ${entreprise}*`,
    "",
    `👤 *Client :* ${client.nom}`,
    `📞 *Téléphone :* ${client.telephone}`,
    `📍 *Adresse :* ${client.adresse}`,
    "",
    "📦 *Articles :*",
    ...lines,
    "",
    `💰 *TOTAL : ${formatPrix(total)}*`,
    "",
    "_Commande envoyée depuis le site web._",
  ].join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const num = normalizeWhatsAppNumber(phone);
  if (!num) return "https://wa.me/";
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
