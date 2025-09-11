import { TabsState } from "@/interfaces/interface-tabs-state";
import { TabValue } from "@/types/type-tab-value";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTabsStore = create<TabsState>()(
  persist(
    (set, get) => ({
      activeTab: "costs",
      visitedTabs: new Set(["costs"]), // Costs siempre visitado por defecto

      setActiveTab: (tab) => {
        const tabValue = tab as TabValue;
        set({ activeTab: tabValue });
        get().markTabAsVisited(tabValue);
      },

      markTabAsVisited: (tab) =>
        set((state) => ({
          visitedTabs: new Set([...state.visitedTabs, tab]),
        })),

      isTabVisited: (tab) => get().visitedTabs.has(tab),
    }),
    {
      name: "configuration-tabs-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        activeTab: state.activeTab,
        visitedTabs: Array.from(state.visitedTabs), // Serializar Set como Array
      }),
      // Deserializar Array como Set
      onRehydrateStorage: () => (state) => {
        if (state?.visitedTabs) {
          state.visitedTabs = new Set(
            state.visitedTabs as unknown as TabValue[]
          );
        }
      },
    }
  )
);
