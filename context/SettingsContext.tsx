/**
 * Contexte des paramètres entreprise (coordonnées, description).
 * Modifiable uniquement par le Super Admin.
 * Consommé par le Footer et la page d'accueil.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { settingsInitiaux } from "@/data/settings";
import { STORAGE_KEYS } from "@/lib/constants";
import type { EntrepriseSettings } from "@/lib/types";

interface SettingsContextValue {
  settings: EntrepriseSettings;
  updateSettings: (data: Partial<EntrepriseSettings>) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<EntrepriseSettings>(
    settingsInitiaux as EntrepriseSettings
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      try {
        setSettings({
          ...(settingsInitiaux as EntrepriseSettings),
          ...JSON.parse(stored),
        });
      } catch {
        setSettings(settingsInitiaux as EntrepriseSettings);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
  }, [settings, loaded]);

  const updateSettings = useCallback((data: Partial<EntrepriseSettings>) => {
    setSettings((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
