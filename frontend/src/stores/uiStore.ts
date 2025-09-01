import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type MenuPlacement = 'top' | 'left' | 'right' | 'bottom';

interface UiState {
  menuPlacement: MenuPlacement;
  themeColor: string;
  bgImageUrl: string;
  setMenuPlacement: (placement: MenuPlacement) => void;
  setThemeColor: (color: string) => void;
  setBgImageUrl: (url: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      // Default values
      menuPlacement: 'left',
      themeColor: '#0d6efd', // Default Bootstrap primary blue
      bgImageUrl: '',

      // Actions
      setMenuPlacement: (placement) => set({ menuPlacement: placement }),
      setThemeColor: (color) => set({ themeColor: color }),
      setBgImageUrl: (url) => set({ bgImageUrl: url }),
    }),
    {
      name: 'ui-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
