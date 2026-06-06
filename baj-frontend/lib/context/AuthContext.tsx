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
const VALID_PHONE = '0788009976';
const VALID_OTP   = '1234';

/* ── Types ───────────────────────────────────────────────── */
interface AuthUser {
  phone: string;
}

interface AuthContextValue {
  user:         AuthUser | null;
  isAuthenticated: boolean;
  isLoading:    boolean;
  pendingPhone: string | null;
  requestOtp:   (phone: string) => Promise<{ error?: string }>;
  verifyOtp:    (otp: string)   => Promise<{ error?: string }>;
  logout:       () => void;
}

/* ── Context ─────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextValue | null>(null);

/* ── Storage keys ────────────────────────────────────────── */
const STORAGE_USER    = 'baj_user';
const STORAGE_PENDING = 'baj_pending_phone';

/* ── Provider ────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,         setUser]         = useState<AuthUser | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const [isLoading,    setIsLoading]    = useState(true);

  /* Restore session on mount */
  useEffect(() => {
    try {
      const storedUser    = sessionStorage.getItem(STORAGE_USER);
      const storedPending = sessionStorage.getItem(STORAGE_PENDING);
      if (storedUser)    setUser(JSON.parse(storedUser));
      if (storedPending) setPendingPhone(storedPending);
    } catch {
      // sessionStorage unavailable (SSR guard)
    }
    setIsLoading(false);
  }, []);

  const requestOtp = useCallback(async (phone: string): Promise<{ error?: string }> => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    if (phone !== VALID_PHONE) {
      return { error: 'Phone number not registered.' };
    }

    setPendingPhone(phone);
    sessionStorage.setItem(STORAGE_PENDING, phone);
    return {};
  }, []);

  const verifyOtp = useCallback(async (otp: string): Promise<{ error?: string }> => {
    await new Promise((r) => setTimeout(r, 600));

    if (!pendingPhone) {
      return { error: 'Session expired. Please start again.' };
    }
    if (otp !== VALID_OTP) {
      return { error: 'Incorrect OTP. Please try again.' };
    }

    const authedUser: AuthUser = { phone: pendingPhone };
    setUser(authedUser);
    setPendingPhone(null);
    sessionStorage.setItem(STORAGE_USER, JSON.stringify(authedUser));
    sessionStorage.removeItem(STORAGE_PENDING);
    return {};
  }, [pendingPhone]);

  const logout = useCallback(() => {
    setUser(null);
    setPendingPhone(null);
    sessionStorage.removeItem(STORAGE_USER);
    sessionStorage.removeItem(STORAGE_PENDING);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        pendingPhone,
        requestOtp,
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
