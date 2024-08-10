import create from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '@/api/axiosInstance';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  refreshAccessToken: () => Promise<boolean>;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      email: null,
      login: (data: LoginResponse) =>
        set({
          isAuthenticated: true,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          email: data.email,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          email: null,
        }),
      checkAuthStatus: async () => {
        const { accessToken, refreshAccessToken } = get();
        if (!accessToken) {
          return false;
        }

        try {
          await axiosInstance.get('/api/validate-token');
          return true;
        } catch (error) {
          console.error('Token validation failed:', error);
          return refreshAccessToken();
        }
      },
      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          get().logout();
          return false;
        }

        try {
          const response = await axiosInstance.post('/api/refresh-token', { refreshToken });
          set({ accessToken: response.data.accessToken });
          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
