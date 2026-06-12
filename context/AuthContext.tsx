/**
 * Authentification admin : initialisation unique sur /admin,
 * puis session persistante. Aucun identifiant codé en dur.
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
import { adminsInitiaux } from "@/data/admins";
import { STORAGE_KEYS } from "@/lib/constants";
import type { AdminSession, AdminUser } from "@/lib/types";

const SUPER_ADMIN_ID = "admin-super";

interface AuthContextValue {
  session: AdminSession | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loaded: boolean;
  admins: AdminUser[];
  superAdminKey: string;
  /** Première configuration : crée le Super Admin et ouvre la session */
  initializeSuperAdmin: (
    username: string,
    password: string,
    specialKey: string
  ) => boolean;
  /** Réaccès après déconnexion (mêmes champs, vérifie vos choix enregistrés) */
  authenticateSuperAdmin: (
    username: string,
    password: string,
    specialKey: string
  ) => boolean;
  logout: () => void;
  updateAdminPassword: (adminId: string, newPassword: string) => boolean;
  resetAdminPassword: (adminId: string) => void;
  updateSuperAdminCredentials: (username: string, password: string) => boolean;
  updateSuperAdminKey: (key: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isInitialized(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.ADMIN_INITIALIZED) === "true";
}

function isValidSession(data: unknown): data is AdminSession {
  if (!data || typeof data !== "object") return false;
  const s = data as AdminSession;
  return (
    typeof s.id === "string" &&
    typeof s.username === "string" &&
    typeof s.nom === "string" &&
    (s.role === "super_admin" || s.role === "admin")
  );
}

function loadSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!stored) return null;
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!isValidSession(parsed)) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    return null;
  }
}

function saveSession(session: AdminSession) {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

function loadAdminsFromStorage(): AdminUser[] {
  const secondary = adminsInitiaux as AdminUser[];
  if (!isInitialized()) return secondary;

  const stored = localStorage.getItem(STORAGE_KEYS.ADMINS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as AdminUser[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      /* ignore */
    }
  }
  return secondary;
}

function loadSuperAdminKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(STORAGE_KEYS.SUPER_ADMIN_KEY) ?? "";
}

function createSessionFromUser(user: AdminUser): AdminSession {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    nom: user.nom,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [superAdminKey, setSuperAdminKey] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = isInitialized();
    if (!init) {
      localStorage.removeItem(STORAGE_KEYS.ADMINS);
      localStorage.removeItem(STORAGE_KEYS.SUPER_ADMIN_KEY);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
    setInitialized(init);
    setAdmins(loadAdminsFromStorage());
    setSuperAdminKey(loadSuperAdminKey());
    if (init) {
      setSession(loadSession());
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && initialized) {
      localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
    }
  }, [admins, loaded, initialized]);

  const persistInitialization = useCallback(
    (superAdmin: AdminUser, key: string, allAdmins: AdminUser[]) => {
      localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(allAdmins));
      localStorage.setItem(STORAGE_KEYS.SUPER_ADMIN_KEY, key);
      localStorage.setItem(STORAGE_KEYS.ADMIN_INITIALIZED, "true");
      setAdmins(allAdmins);
      setSuperAdminKey(key);
      setInitialized(true);
      const newSession = createSessionFromUser(superAdmin);
      saveSession(newSession);
      setSession(newSession);
    },
    []
  );

  const initializeSuperAdmin = useCallback(
    (username: string, password: string, specialKey: string): boolean => {
      if (initialized) return false;
      const u = username.trim();
      if (!u || !password || password.length < 4) return false;
      if (!specialKey || specialKey.length < 4) return false;

      const superAdmin: AdminUser = {
        id: SUPER_ADMIN_ID,
        username: u,
        password,
        role: "super_admin",
        nom: u,
        email: "direction@manbois-kinshasa.cd",
      };

      const secondary = (adminsInitiaux as AdminUser[]).filter(
        (a) => a.role !== "super_admin"
      );
      persistInitialization(superAdmin, specialKey, [superAdmin, ...secondary]);
      return true;
    },
    [initialized, persistInitialization]
  );

  const authenticateSuperAdmin = useCallback(
    (username: string, password: string, specialKey: string): boolean => {
      if (!initialized) return false;

      const superAdmin = admins.find(
        (a) =>
          a.id === SUPER_ADMIN_ID &&
          a.username === username.trim() &&
          a.password === password
      );
      if (!superAdmin) return false;
      if (!specialKey || specialKey !== superAdminKey) return false;

      const newSession = createSessionFromUser(superAdmin);
      saveSession(newSession);
      setSession(newSession);
      return true;
    },
    [admins, initialized, superAdminKey]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setSession(null);
  }, []);

  const updateAdminPassword = useCallback((adminId: string, newPassword: string) => {
    if (!newPassword || newPassword.length < 4) return false;
    setAdmins((prev) =>
      prev.map((a) => (a.id === adminId ? { ...a, password: newPassword } : a))
    );
    return true;
  }, []);

  const resetAdminPassword = useCallback((adminId: string) => {
    const initial = (adminsInitiaux as AdminUser[]).find((a) => a.id === adminId);
    if (!initial) return;
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === adminId ? { ...a, password: initial.password } : a
      )
    );
  }, []);

  const updateSuperAdminCredentials = useCallback(
    (username: string, password: string) => {
      if (!username.trim() || !password || password.length < 4) return false;

      setAdmins((prev) =>
        prev.map((a) =>
          a.id === SUPER_ADMIN_ID
            ? {
                ...a,
                username: username.trim(),
                password,
                nom: username.trim(),
              }
            : a
        )
      );

      if (session?.id === SUPER_ADMIN_ID) {
        const updated: AdminSession = {
          ...session,
          username: username.trim(),
          nom: username.trim(),
        };
        saveSession(updated);
        setSession(updated);
      }
      return true;
    },
    [session]
  );

  const updateSuperAdminKey = useCallback((key: string) => {
    if (!key || key.length < 4) return false;
    setSuperAdminKey(key);
    localStorage.setItem(STORAGE_KEYS.SUPER_ADMIN_KEY, key);
    return true;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        isInitialized: initialized,
        loaded,
        admins,
        superAdminKey,
        initializeSuperAdmin,
        authenticateSuperAdmin,
        logout,
        updateAdminPassword,
        resetAdminPassword,
        updateSuperAdminCredentials,
        updateSuperAdminKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
