/**
 * Catégories du catalogue bois — structure officielle MAN BOIS KINSHASA.
 * Le champ `type` correspond à la propriété `type` de chaque produit dans bois.js.
 */

export const categories = [
  {
    id: "charpente",
    type: "Charpente",
    label: "Charpente",
    description:
      "Madriers, chevrons et poutres pour ossatures, toitures et structures en bois.",
    icon: "🏗️",
    color: "amber",
  },
  {
    id: "menuiserie",
    type: "Menuiserie",
    label: "Menuiserie",
    description:
      "Bois de finition Iroko, Wenge et Padouk pour portes, meubles et aménagements.",
    icon: "🪚",
    color: "stone",
  },
  {
    id: "coffrage",
    type: "Coffrage",
    label: "Coffrage",
    description:
      "Planches et lattes réutilisables pour coffrage béton sur chantiers à Kinshasa.",
    icon: "🧱",
    color: "orange",
  },
];

/** Essences de bois proposées */
export const essences = ["Iroko", "Wenge", "Padouk"];
