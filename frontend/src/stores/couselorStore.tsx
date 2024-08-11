import create from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '@/api/axiosInstance';
import useAuthStore from '@/stores/authStore';

interface MemberState {
  name: string | null;
  level: number | null;
  license: string | null;
  intro: string | null;
  introDetail: string | null;
  img: string | null;
  isLoading: boolean;
  error: string | null;
  fetchCounselor: () => Promise<void>;
  clearCounselor: () => void;
}

const useMemberStore = create<MemberState>()(
  persist(
    set => ({
      name: null,
      level: null,
      license: null,
      intro: null,
      introDetail: null,
      img: null,
      isLoading: false,
      error: null,
      fetchCounselor: async () => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance({
            method: 'get',
            url: 'c/member/counselor',
          });
          set({
            name: response.data.name,
            level: response.data.level,
            license: response.data.license,
            intro: response.data.intro,
            introDetail: response.data.introDetail,
            img: response.data.img,
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
      clearCounselor: () =>
        set({
          name: null,
          level: null,
          license: null,
          intro: null,
          introDetail: null,
          img: null,
          error: null,
        }),
    }),
    {
      name: 'counselor-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useMemberStore;
