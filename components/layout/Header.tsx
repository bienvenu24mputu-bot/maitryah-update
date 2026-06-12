"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/context/LocaleContext";

export function Header() {
  const pathname = usePathname();
  const { nombreArticles } = useCart();
  const { t } = useLocale();

  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/catalogue", label: t("nav.catalogue") },
    { href: "/panier", label: t("nav.cart") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/20 bg-amber-950/95 text-amber-50 backdrop-blur dark:border-amber-800/30 dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 pr-28 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600 text-lg font-bold text-amber-950">
            MB
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-amber-200">
              MAN BOIS
            </p>
            <p className="text-xs text-amber-400">Kinshasa</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                pathname === link.href
                  ? "bg-amber-700 text-white"
                  : "text-amber-100 hover:bg-amber-800/60"
              }`}
            >
              {link.label}
              {link.href === "/panier" && nombreArticles > 0 && (
                <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-amber-950">
                  {nombreArticles}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
