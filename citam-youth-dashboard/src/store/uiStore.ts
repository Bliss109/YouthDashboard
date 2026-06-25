import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { UiState } from '../types/store.types'

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        // ── State
        theme: 'light',
        sidebarCollapsed: false,
        activeSection: 'dashboard',

        // ── Actions
        toggleTheme: () =>
          set(
            state => {
              const next = state.theme === 'light' ? 'dark' : 'light'
              document.documentElement.setAttribute('data-theme', next)
              return { theme: next }
            },
            false,
            'toggleTheme'
          ),

        toggleSidebar: () =>
          set(
            state => ({ sidebarCollapsed: !state.sidebarCollapsed }),
            false,
            'toggleSidebar'
          ),

        setActiveSection: (section: string) =>
          set(
            { activeSection: section },
            false,
            'setActiveSection'
          ),
      }),
      {
        name: 'citam-ui-store',        // persisted to localStorage
        partialize: state => ({        // only persist theme preference
          theme: state.theme,
        }),
      }
    ),
    { name: 'UiStore' }
  )
)