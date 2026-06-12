"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import { useLocale } from "@/context/LocaleContext";

export function Footer() {
  const pathname = usePathname();
  const { settings } = useSettings();
  const { t } = useLocale();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-amber-900/20 bg-amber-950 text-amber-100 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <h3 className="text-lg font-semibold text-amber-300">{settings.nom}</h3>
          <p className="mt-2 text-sm text-amber-400/80">{settings.description}</p>
        </div>
        <div>
          <h4 className="font-medium text-amber-300">{t("footer.navigation")}</h4>
          <ul className="mt-2 space-y-1 text-sm text-amber-400/80">
            <li>
              <Link href="/catalogue" className="hover:text-amber-200">
                {t("nav.catalogue")}
              </Link>
            </li>
            <li>
              <Link href="/panier" className="hover:text-amber-200">
                {t("nav.cart")}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-amber-200">
                {t("nav.privacy")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-amber-300">{t("footer.contact")}</h4>
          <ul className="mt-2 space-y-1 text-sm text-amber-400/80">
            <li>{settings.adresse}</li>
            <li>{settings.telephone}</li>
            <li>{settings.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-amber-900/30 py-4 text-center text-xs text-amber-500 dark:border-stone-800">
        © {new Date().getFullYear()} {settings.nom}. {t("footer.rights")}
      </div>
    </footer>
  );
}
