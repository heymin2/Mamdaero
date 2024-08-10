import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: string | null;
  email: string | null;
  login: (accessToken: string, role: string, email: string) => void;
  logout: () => void;
  getAccessToken: () => string | null;
  getRole: () => string | null;
  getEmail: () => string | null;
  isCounselor: () => boolean;
  isClient: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      role: null,
      email: null,
      login: (accessToken: string, role: string, email: string) =>
        set({
          isAuthenticated: true,
          accessToken,
          role,
          email,
        }),
      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          role: null,
          email: null,
        });
        localStorage.removeItem('auth-storage');
      },
      getAccessToken: () => get().accessToken,
      getRole: () => get().role,
      getEmail: () => get().email,
      isCounselor: () => get().role?.includes('상담사') ?? false,
      isClient: () => get().role?.includes('내담자') ?? false,
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
