import type { Dimensions } from "./types";

export function formatDimensions(d: Dimensions): string {
  return `${d.epaisseur} × ${d.largeur} × ${d.longueur} mm`;
}

export function formatPrix(prix: number): string {
  return `$${prix.toFixed(2)}`;
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
