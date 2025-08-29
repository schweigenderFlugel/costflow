"use client"
import { useEffect, useState } from 'react'
import { useTabsStore } from '@/store/tabs-store'

export const useTabs = () => {
  const [isHydrated, setIsHydrated] = useState(false)
  const store = useTabsStore()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Durante la hidratación, usar valor por defecto
  if (!isHydrated) {
    return {
      activeTab: "costs" as const,
      setActiveTab: () => { },
      isTabVisited: () => false,
      markTabAsVisited: () => { },
    }
  }

  return {
    activeTab: store.activeTab,
    setActiveTab: store.setActiveTab,
    isTabVisited: store.isTabVisited,
    markTabAsVisited: store.markTabAsVisited,
  }
}
