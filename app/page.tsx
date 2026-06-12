import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

const features = [
  {
    title: "Essences locales",
    description: "Iroko, Wenge et Padouk sélectionnés pour leur durabilité en climat tropical.",
    icon: "🌳",
  },
  {
    title: "Stock disponible",
    description: "Inventaire en temps réel avec livraison sur Kinshasa et environs.",
    icon: "📦",
  },
  {
    title: "Prix compétitifs",
    description: "Tarifs transparents en dollars, adaptés aux professionnels du bâtiment.",
    icon: "💰",
  },
];

const homeCategories = categories.map((c) => ({
  name: c.label,
  description: c.description,
  icon: c.icon,
  href: `/catalogue?type=${encodeURIComponent(c.type)}`,
}));

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-amber-950 text-amber-50">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://placehold.co/1920x800/5C3D2E/FFFFFF?text=MAN+BOIS+KINSHASA"
            alt=""
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">
            Depuis Kinshasa, RDC
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            MAN BOIS KINSHASA
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-amber-200/90">
            Votre fournisseur de référence en bois d&apos;œuvre. Madriers, chevrons
            et planches de coffrage en Iroko, Wenge et Padouk — qualité professionnelle
            pour vos chantiers à Kinshasa.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/catalogue"
              className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-amber-950 transition-colors hover:bg-amber-500"
            >
              Voir le catalogue
            </Link>
            <Link
              href="/panier"
              className="rounded-lg border border-amber-400/50 px-6 py-3 font-medium text-amber-100 transition-colors hover:bg-amber-900/50"
            >
              Mon panier
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-amber-950">
          Pourquoi nous choisir ?
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-amber-200/60 bg-white p-6 text-center shadow-sm"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-amber-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-stone-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-amber-100/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-amber-950">
            Nos catégories
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {homeCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group rounded-xl border border-amber-200 bg-white p-6 shadow-sm transition-all hover:border-amber-400 hover:shadow-md dark:border-stone-700 dark:bg-stone-900"
              >
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="mt-2 text-xl font-semibold text-amber-800 group-hover:text-amber-600 dark:text-amber-200">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm text-stone-500">{cat.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-amber-700 group-hover:underline">
                  Explorer →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-amber-950">
          Prêt à commander ?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-stone-500">
          Parcourez notre catalogue complet, ajoutez vos produits au panier et
          passez commande en quelques clics.
        </p>
        <Link
          href="/catalogue"
          className="mt-6 inline-block rounded-lg bg-amber-700 px-8 py-3 font-medium text-white transition-colors hover:bg-amber-800"
        >
          Accéder au catalogue
        </Link>
      </section>
    </>
  );
}
