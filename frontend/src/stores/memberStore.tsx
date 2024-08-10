import create from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '@/api/axiosInstance';
import useAuthStore from '@/stores/authStore';

interface MemberState {
  name: string | null;
  email: string | null;
  nickname: string | null;
  birth: string | null;
  tel: string | null;
  gender: string | null;
  isLoading: boolean;
  error: string | null;
  fetchMember: () => Promise<void>;
  clearMember: () => void;
}

const useMemberStore = create<MemberState>()(
  persist(
    set => ({
      name: null,
      email: null,
      nickname: null,
      birth: null,
      tel: null,
      gender: null,
      isLoading: false,
      error: null,
      fetchMember: async () => {
        set({ isLoading: true });
        const accessToken = useAuthStore.getState().accessToken;
        if (!accessToken) {
          set({ error: 'No access token available', isLoading: false });
          return;
        }
        try {
          const response = await axiosInstance({
            method: 'get',
            url: 'm/member',
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          console.log(response);
          set({
            name: response.data.name,
            email: response.data.email,
            nickname: response.data.nickname,
            birth: response.data.birth,
            tel: response.data.tel,
            gender: response.data.gender,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            isLoading: false,
          });
        }
      },
      clearMember: () =>
        set({
          name: null,
          email: null,
          nickname: null,
          birth: null,
          tel: null,
          gender: null,
          error: null,
        }),
    }),
    {
      name: 'member-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useMemberStore;
