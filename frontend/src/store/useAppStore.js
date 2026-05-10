import { create } from 'zustand'

/**
 * Global app store — manages UI state, user session, theme toggles
 */
const useAppStore = create((set) => ({
  // ── UI State ──
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  // ── User ──
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  // ── Active Feature ──
  activeFeature: null,
  setActiveFeature: (feature) => set({ activeFeature: feature }),
}))

export default useAppStore
