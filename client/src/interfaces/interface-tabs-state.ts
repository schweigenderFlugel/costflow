import type { TabValue } from "@/types/type-tab-value";
export interface TabsState {
  activeTab: TabValue;
  visitedTabs: Set<TabValue>; // Track de tabs visitados para cache
  setActiveTab: (tab: string) => void;
  markTabAsVisited: (tab: TabValue) => void;
  isTabVisited: (tab: TabValue) => boolean;
}
