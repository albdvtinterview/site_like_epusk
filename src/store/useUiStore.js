import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUiStore = create(
  persist(
    (set) => ({
      mobileMenuOpen: false,
      modal: null,
      catalogSearch: '',
      cookieAccepted: false,
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
      setCatalogSearch: (catalogSearch) => set({ catalogSearch }),
      openModal: (modal) => set({ modal, mobileMenuOpen: false }),
      closeModal: () => set({ modal: null }),
      acceptCookies: () => set({ cookieAccepted: true }),
    }),
    {
      name: 'energopusk-ui',
      partialize: (state) => ({ cookieAccepted: state.cookieAccepted }),
    },
  ),
)
