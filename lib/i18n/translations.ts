/**
 * Traductions FR / Lingala / EN.
 * Ajoutez une clé ici pour tout nouveau texte affiché à l'utilisateur.
 */

import type { Locale } from "@/lib/constants";

export type TranslationKey =
  | "nav.home"
  | "nav.catalogue"
  | "nav.cart"
  | "nav.privacy"
  | "theme.light"
  | "theme.dark"
  | "footer.navigation"
  | "footer.contact"
  | "footer.rights"
  | "home.hero.location"
  | "home.hero.cta.catalogue"
  | "home.hero.cta.cart"
  | "home.why.title"
  | "home.categories.title"
  | "home.order.title"
  | "home.order.cta"
  | "catalogue.title"
  | "catalogue.subtitle"
  | "cart.title"
  | "cart.subtitle"
  | "cart.empty"
  | "admin.login.title"
  | "admin.login.subtitle"
  | "admin.login.username"
  | "admin.login.password"
  | "admin.login.specialKey"
  | "admin.login.specialKeyHint"
  | "admin.login.submit"
  | "admin.login.error"
  | "admin.login.keyError"
  | "admin.login.restricted"
  | "admin.dashboard.title"
  | "admin.section.orders"
  | "admin.section.products"
  | "admin.section.settings"
  | "admin.section.access"
  | "admin.logout"
  | "admin.access.title"
  | "admin.access.subtitle"
  | "admin.access.myAccount"
  | "admin.access.myAccountDesc"
  | "admin.access.username"
  | "admin.access.password"
  | "admin.access.save"
  | "admin.access.saved"
  | "admin.access.specialKey"
  | "admin.access.specialKeyDesc"
  | "admin.access.newKey"
  | "admin.access.updateKey"
  | "admin.access.keyUpdated"
  | "admin.access.otherAdmins"
  | "privacy.title"
  | "privacy.updated"
  | "privacy.intro"
  | "privacy.s1.title"
  | "privacy.s1.body"
  | "privacy.s2.title"
  | "privacy.s2.body"
  | "privacy.s3.title"
  | "privacy.s3.body"
  | "privacy.s4.title"
  | "privacy.s4.body"
  | "privacy.s5.title"
  | "privacy.s5.body"
  | "privacy.contact";

type Dictionary = Record<TranslationKey, string>;

const fr: Dictionary = {
  "nav.home": "Accueil",
  "nav.catalogue": "Catalogue",
  "nav.cart": "Panier",
  "nav.privacy": "Confidentialité",
  "theme.light": "Mode clair",
  "theme.dark": "Mode sombre",
  "footer.navigation": "Navigation",
  "footer.contact": "Contact",
  "footer.rights": "Tous droits réservés.",
  "home.hero.location": "Depuis Kinshasa, RDC",
  "home.hero.cta.catalogue": "Voir le catalogue",
  "home.hero.cta.cart": "Mon panier",
  "home.why.title": "Pourquoi nous choisir ?",
  "home.categories.title": "Nos catégories",
  "home.order.title": "Prêt à commander ?",
  "home.order.cta": "Accéder au catalogue",
  "catalogue.title": "Catalogue",
  "catalogue.subtitle":
    "Madriers, chevrons et planches de coffrage — filtrez par essence ou type",
  "cart.title": "Mon panier",
  "cart.subtitle": "Gérez vos articles et passez commande",
  "cart.empty": "Votre panier est vide",
  "admin.login.title": "Espace Administrateur",
  "admin.login.subtitle": "Accès sécurisé — MAN BOIS KINSHASA",
  "admin.login.username": "Nom d'utilisateur",
  "admin.login.password": "Mot de passe",
  "admin.login.specialKey": "Clé Spéciale Super Admin",
  "admin.login.specialKeyHint":
    "Obligatoire pour la connexion Super Admin. Les autres admins peuvent saisir « — ».",
  "admin.login.submit": "Se connecter",
  "admin.login.error": "Identifiants incorrects. Accès refusé.",
  "admin.login.keyError": "Clé spéciale Super Admin incorrecte.",
  "admin.login.restricted": "Accès réservé aux administrateurs autorisés",
  "admin.dashboard.title": "Tableau de bord",
  "admin.section.orders": "Suivi des commandes",
  "admin.section.products": "Gestion du catalogue",
  "admin.section.settings": "Coordonnées entreprise",
  "admin.section.access": "Configuration des accès",
  "admin.logout": "Déconnexion",
  "admin.access.title": "Configuration des accès",
  "admin.access.subtitle":
    "Modifiez votre identifiant, mot de passe et clé spéciale Super Admin.",
  "admin.access.myAccount": "Mon compte Super Admin",
  "admin.access.myAccountDesc":
    "Changez votre nom d'utilisateur et mot de passe sans toucher au code.",
  "admin.access.username": "Nom d'utilisateur",
  "admin.access.password": "Nouveau mot de passe",
  "admin.access.save": "Enregistrer mes identifiants",
  "admin.access.saved": "Identifiants mis à jour ✓",
  "admin.access.specialKey": "Clé Spéciale Super Admin",
  "admin.access.specialKeyDesc":
    "Seul le Super Admin connaît et peut modifier cette clé de connexion.",
  "admin.access.newKey": "Nouvelle clé spéciale",
  "admin.access.updateKey": "Mettre à jour la clé",
  "admin.access.keyUpdated": "Clé spéciale mise à jour ✓",
  "admin.access.otherAdmins": "Autres administrateurs",
  "privacy.title": "Politique de confidentialité",
  "privacy.updated": "Dernière mise à jour : juin 2026",
  "privacy.intro":
    "MAN BOIS KINSHASA s'engage à protéger vos données personnelles conformément aux bonnes pratiques en vigueur en République Démocratique du Congo.",
  "privacy.s1.title": "1. Données collectées",
  "privacy.s1.body":
    "Lors d'une commande sur notre site, nous collectons : nom complet, numéro de téléphone, adresse de livraison à Kinshasa, détail des produits commandés et montant total. Ces informations sont nécessaires au traitement et à la livraison de votre commande.",
  "privacy.s2.title": "2. Commandes en ligne",
  "privacy.s2.body":
    "Les commandes passées sur manbois-kinshasa.cd sont enregistrées de manière sécurisée. Elles sont utilisées exclusivement pour la préparation, le suivi et la facturation de votre achat. Nous ne vendons ni ne partageons vos données de commande avec des tiers sans votre consentement, sauf obligation légale.",
  "privacy.s3.title": "3. Messages WhatsApp",
  "privacy.s3.body":
    "Si vous nous contactez via WhatsApp (+243), les messages reçus (texte, photos, localisation) sont traités uniquement pour répondre à vos demandes commerciales, confirmer des commandes ou organiser des livraisons. Les conversations peuvent être archivées à des fins de suivi client et de preuve commerciale, dans le respect de la confidentialité professionnelle.",
  "privacy.s4.title": "4. Conservation et sécurité",
  "privacy.s4.body":
    "Vos données sont conservées pendant la durée nécessaire à la relation commerciale et aux obligations comptables. Nous mettons en œuvre des mesures raisonnables pour protéger vos informations contre tout accès non autorisé.",
  "privacy.s5.title": "5. Vos droits",
  "privacy.s5.body":
    "Vous pouvez demander l'accès, la rectification ou la suppression de vos données personnelles en nous contactant par email ou WhatsApp. MAN BOIS KINSHASA traitera votre demande dans un délai raisonnable.",
  "privacy.contact":
    "Pour toute question : contact@manbois-kinshasa.cd ou WhatsApp +243 81 000 00 00.",
};

const ln: Dictionary = {
  "nav.home": "Ebandeli",
  "nav.catalogue": "Catalogue",
  "nav.cart": "Panier",
  "nav.privacy": "Bopesi ya makambo",
  "theme.light": "Mode ya pole",
  "theme.dark": "Mode ya molili",
  "footer.navigation": "Kobongola",
  "footer.contact": "Bokani",
  "footer.rights": "Makoki nyonso batiyi.",
  "home.hero.location": "Na Kinshasa, RDC",
  "home.hero.cta.catalogue": "Tala catalogue",
  "home.hero.cta.cart": "Panier na ngai",
  "home.why.title": "Pourquoi bachois biso ?",
  "home.categories.title": "Biteni na biso",
  "home.order.title": "Ozali prêt kosomba ?",
  "home.order.cta": "Kota na catalogue",
  "catalogue.title": "Catalogue",
  "catalogue.subtitle":
    "Madriers, chevrons mpe planches — filtre na essence to type",
  "cart.title": "Panier na ngai",
  "cart.subtitle": "Bongisa biloko mpe sala commande",
  "cart.empty": "Panier na yo ezali mpamba",
  "admin.login.title": "Espace Administrateur",
  "admin.login.subtitle": "Accès sécurisé — MAN BOIS KINSHASA",
  "admin.login.username": "Nom d'utilisateur",
  "admin.login.password": "Mot de passe",
  "admin.login.specialKey": "Clé Spéciale Super Admin",
  "admin.login.specialKeyHint":
    "Esengeli mpo na Super Admin. Ba admin mosusu bakoki kotia « — ».",
  "admin.login.submit": "Kota",
  "admin.login.error": "Ba identifiants ezali malamu te.",
  "admin.login.keyError": "Clé spéciale ezali malamu te.",
  "admin.login.restricted": "Accès mpo na ba administrateurs kaka",
  "admin.dashboard.title": "Tableau de bord",
  "admin.section.orders": "Kolanda ba commandes",
  "admin.section.products": "Kobongisa catalogue",
  "admin.section.settings": "Ba coordonnées",
  "admin.section.access": "Configuration ya accès",
  "admin.logout": "Kobima",
  "admin.access.title": "Configuration ya accès",
  "admin.access.subtitle":
    "Bongisa identifiant na yo, mot de passe mpe clé spéciale.",
  "admin.access.myAccount": "Compte na ngai Super Admin",
  "admin.access.myAccountDesc":
    "Bongisa nom d'utilisateur mpe mot de passe na yo.",
  "admin.access.username": "Nom d'utilisateur",
  "admin.access.password": "Mot de passe ya sika",
  "admin.access.save": "Bomba ba identifiants",
  "admin.access.saved": "Identifiants ebongwani ✓",
  "admin.access.specialKey": "Clé Spéciale Super Admin",
  "admin.access.specialKeyDesc":
    "Super Admin kaka akoki koyeba mpe kobongisa clé oyo.",
  "admin.access.newKey": "Clé ya sika",
  "admin.access.updateKey": "Bongisa clé",
  "admin.access.keyUpdated": "Clé ebongwani ✓",
  "admin.access.otherAdmins": "Ba administrateurs mosusu",
  "privacy.title": "Politique ya bopesi ya makambo",
  "privacy.updated": "Mise à jour ya nsuka : juin 2026",
  "privacy.intro":
    "MAN BOIS KINSHASA azali kobatela ba données na bino na ndenge ya malamu na RDC.",
  "privacy.s1.title": "1. Ba données oyo biso collectons",
  "privacy.s1.body":
    "Na commande, biso collectons : kombo, téléphone, adresse na Kinshasa, biloko oyo osombi mpe motuya. Oyo esengeli mpo na kosala commande na yo.",
  "privacy.s2.title": "2. Ba commandes en ligne",
  "privacy.s2.body":
    "Ba commandes na site batiyi na sécurité. Batiyi kaka mpo na préparation, suivi mpe livraison. Tozali koteka te ba données na bino.",
  "privacy.s3.title": "3. Ba messages WhatsApp",
  "privacy.s3.body":
    "Soki obengi biso na WhatsApp, ba messages (texte, photo) batiyi kaka mpo na koyanola, kondima commande to organiser livraison. Ba conversations bakoki kozala na archive mpo na suivi client.",
  "privacy.s4.title": "4. Kobatela mpe sécurité",
  "privacy.s4.body":
    "Ba données batiyi pendant temps ya relation commerciale. Tozali kosala makambo mpo na kobatela ba informations na bino.",
  "privacy.s5.title": "5. Makoki na bino",
  "privacy.s5.body":
    "Okoki kosenga kotala, kobongisa to kolongola ba données na bino na email to WhatsApp.",
  "privacy.contact":
    "Mituna : contact@manbois-kinshasa.cd to WhatsApp +243 81 000 00 00.",
};

const en: Dictionary = {
  "nav.home": "Home",
  "nav.catalogue": "Catalogue",
  "nav.cart": "Cart",
  "nav.privacy": "Privacy",
  "theme.light": "Light mode",
  "theme.dark": "Dark mode",
  "footer.navigation": "Navigation",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "home.hero.location": "From Kinshasa, DRC",
  "home.hero.cta.catalogue": "View catalogue",
  "home.hero.cta.cart": "My cart",
  "home.why.title": "Why choose us?",
  "home.categories.title": "Our categories",
  "home.order.title": "Ready to order?",
  "home.order.cta": "Go to catalogue",
  "catalogue.title": "Catalogue",
  "catalogue.subtitle":
    "Timber, rafters and formwork boards — filter by wood type or category",
  "cart.title": "My cart",
  "cart.subtitle": "Manage your items and place an order",
  "cart.empty": "Your cart is empty",
  "admin.login.title": "Administrator Area",
  "admin.login.subtitle": "Secure access — MAN BOIS KINSHASA",
  "admin.login.username": "Username",
  "admin.login.password": "Password",
  "admin.login.specialKey": "Super Admin Special Key",
  "admin.login.specialKeyHint":
    "Required for Super Admin login. Other admins may enter « — ».",
  "admin.login.submit": "Sign in",
  "admin.login.error": "Invalid credentials. Access denied.",
  "admin.login.keyError": "Incorrect Super Admin special key.",
  "admin.login.restricted": "Access restricted to authorized administrators",
  "admin.dashboard.title": "Dashboard",
  "admin.section.orders": "Order tracking",
  "admin.section.products": "Catalogue management",
  "admin.section.settings": "Company details",
  "admin.section.access": "Access configuration",
  "admin.logout": "Sign out",
  "admin.access.title": "Access configuration",
  "admin.access.subtitle":
    "Update your username, password and Super Admin special key.",
  "admin.access.myAccount": "My Super Admin account",
  "admin.access.myAccountDesc":
    "Change your username and password without editing code.",
  "admin.access.username": "Username",
  "admin.access.password": "New password",
  "admin.access.save": "Save my credentials",
  "admin.access.saved": "Credentials updated ✓",
  "admin.access.specialKey": "Super Admin Special Key",
  "admin.access.specialKeyDesc":
    "Only the Super Admin knows and can modify this login key.",
  "admin.access.newKey": "New special key",
  "admin.access.updateKey": "Update key",
  "admin.access.keyUpdated": "Special key updated ✓",
  "admin.access.otherAdmins": "Other administrators",
  "privacy.title": "Privacy Policy",
  "privacy.updated": "Last updated: June 2026",
  "privacy.intro":
    "MAN BOIS KINSHASA is committed to protecting your personal data in accordance with best practices in the Democratic Republic of Congo.",
  "privacy.s1.title": "1. Data collected",
  "privacy.s1.body":
    "When you place an order on our website, we collect: full name, phone number, delivery address in Kinshasa, order details and total amount. This information is required to process and deliver your order.",
  "privacy.s2.title": "2. Online orders",
  "privacy.s2.body":
    "Orders placed on our site are recorded securely. They are used exclusively for preparation, tracking and billing. We do not sell or share your order data with third parties without your consent, except where required by law.",
  "privacy.s3.title": "3. WhatsApp messages",
  "privacy.s3.body":
    "If you contact us via WhatsApp (+243), messages received (text, photos, location) are processed solely to respond to commercial requests, confirm orders or arrange deliveries. Conversations may be archived for customer follow-up and commercial records, subject to professional confidentiality.",
  "privacy.s4.title": "4. Retention and security",
  "privacy.s4.body":
    "Your data is kept for as long as necessary for the business relationship and accounting obligations. We implement reasonable measures to protect your information from unauthorized access.",
  "privacy.s5.title": "5. Your rights",
  "privacy.s5.body":
    "You may request access, correction or deletion of your personal data by contacting us by email or WhatsApp. MAN BOIS KINSHASA will process your request within a reasonable time.",
  "privacy.contact":
    "Questions: contact@manbois-kinshasa.cd or WhatsApp +243 81 000 00 00.",
};

export const translations: Record<Locale, Dictionary> = { fr, ln, en };

export function translate(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] ?? translations.fr[key] ?? key;
}
