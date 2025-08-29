"use client"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { useTabs } from "@/hooks/use-tabs"
import ContentLoadingSkeleton from "@/components/configuration/content/content-loading-skeleton"

// Dynamic imports con loading states específicos
const CostsContent = dynamic(
  () => import("@/components/configuration/content/costs-content"),
  {
    loading: () => <ContentLoadingSkeleton />
  }
)

const ProfileContent = dynamic(
  () => import("@/components/configuration/content/profile-content"),
  {
    loading: () => <ContentLoadingSkeleton />
  }
)

const NotificationsContent = dynamic(
  () => import("@/components/configuration/content/notifications-content"),
  {
    loading: () => <ContentLoadingSkeleton />
  }
)

const UserManagementContent = dynamic(
  () => import("@/components/users/user-table"),
  {
    loading: () => <ContentLoadingSkeleton />
  }
)

const HelpContent = dynamic(
  () => import("@/components/configuration/content/help-content"),
  {
    loading: () => <ContentLoadingSkeleton />
  }
)


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DynamicTabContent = ({ getIndirectCostsData, getUsersData }: { getIndirectCostsData: Promise<any[]>, getUsersData: Promise<any[]> }) => {
  const { activeTab } = useTabs()

  const tabComponents = {
    costs: CostsContent,
    profile: ProfileContent,
    notifications: NotificationsContent,
    "user-management": UserManagementContent,
    help: HelpContent,
  } as const

  const ActiveComponent = tabComponents[activeTab as keyof typeof tabComponents]
  const correspondingData = activeTab === "costs" ? getIndirectCostsData : activeTab === "user-management" ? getUsersData : Promise.resolve([])

  return (
    <Suspense fallback={<ContentLoadingSkeleton />}>
      {ActiveComponent && <ActiveComponent getData={correspondingData} />}
    </Suspense>
  )
}

export default DynamicTabContent
