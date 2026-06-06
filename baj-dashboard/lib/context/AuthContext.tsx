'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

/* ── Fake credentials ────────────────────────────────────── */
const VALID_EMAIL    = 'admin@baj.rw';
const VALID_PASSWORD = 'Admin@123';
const VALID_OTP      = '123456';

/* ── Types ───────────────────────────────────────────────── */
export interface StaffUser {
  email: string;
  name:  string;
  role:  'admin' | 'staff';
}

interface AuthContextValue {
  user:            StaffUser | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  pendingEmail:    string | null;
  login:           (email: string, password: string) => Promise<{ error?: string }>;
  verifyOtp:       (otp: string) => Promise<{ error?: string }>;
  logout:          () => void;
}

/* ── Context ─────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextValue | null>(null);

/* ── Storage keys ────────────────────────────────────────── */
const STORAGE_USER    = 'baj_staff_user';
const STORAGE_PENDING = 'baj_staff_pending_email';

/* ── Provider ────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,         setUser]         = useState<StaffUser | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isLoading,    setIsLoading]    = useState(true);

  /* Restore session on mount */
  useEffect(() => {
    try {
      const storedUser    = sessionStorage.getItem(STORAGE_USER);
      const storedPending = sessionStorage.getItem(STORAGE_PENDING);
      if (storedUser)    setUser(JSON.parse(storedUser));
      if (storedPending) setPendingEmail(storedPending);
    } catch {
      // sessionStorage unavailable (SSR guard)
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      await new Promise((r) => setTimeout(r, 700));

      if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
        return { error: 'Incorrect email or password.' };
      }

      setPendingEmail(email);
      sessionStorage.setItem(STORAGE_PENDING, email);
      return {};
    },
    []
  );

  const verifyOtp = useCallback(
    async (otp: string): Promise<{ error?: string }> => {
      await new Promise((r) => setTimeout(r, 600));

      if (!pendingEmail) {
        return { error: 'Session expired. Please sign in again.' };
      }
      if (otp !== VALID_OTP) {
        return { error: 'Incorrect code. Please try again.' };
      }

      const authedUser: StaffUser = {
        email: pendingEmail,
        name:  'Admin',
        role:  'admin',
      };
      setUser(authedUser);
      setPendingEmail(null);
      sessionStorage.setItem(STORAGE_USER, JSON.stringify(authedUser));
      sessionStorage.removeItem(STORAGE_PENDING);
      return {};
    },
    [pendingEmail]
  );

  const logout = useCallback(() => {
    setUser(null);
    setPendingEmail(null);
    sessionStorage.removeItem(STORAGE_USER);
    sessionStorage.removeItem(STORAGE_PENDING);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        pendingEmail,
        login,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ────────────────────────────────────────────────── */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
