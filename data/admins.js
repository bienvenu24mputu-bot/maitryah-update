/**
 * Comptes administrateurs secondaires (optionnels au démarrage).
 * Le Super Admin est créé uniquement via le formulaire d'initialisation /admin.
 */

export const adminsInitiaux = [
  {
    id: "admin-kinshasa",
    username: "admin_kinshasa",
    password: "admin2024",
    role: "admin",
    nom: "Responsable Kinshasa",
    email: "kinshasa@manbois-kinshasa.cd",
  },
  {
    id: "admin-ventes",
    username: "admin_ventes",
    password: "ventes2024",
    role: "admin",
    nom: "Responsable Ventes",
    email: "ventes@manbois-kinshasa.cd",
  },
];
