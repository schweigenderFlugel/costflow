"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { tabsList } from "@/components/configuration/tabs"
import { useTabs } from "@/hooks/use-tabs"


const ConfigurationsTabs = () => {
  const { activeTab, setActiveTab } = useTabs()

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-6 max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5">
      <TabsList asChild className="h-auto p-0 bg-transparent rounded-none">
        <nav>
          {tabsList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex gap-2 px-4 py-2.5 cursor-pointer rounded-none border-b-3 border-transparent data-[state=active]:border-b-primary transition-colors font-medium data-[state=active]:shadow-none"
            >
              {activeTab === tab.value ? (
                <tab.activeIcon className="size-4" />
              ) : (
                <tab.icon className="size-4" />
              )}
              {tab.text}
            </TabsTrigger>
          ))}
        </nav>
      </TabsList>
    </Tabs>
  )
}

export default ConfigurationsTabs;
