import { UserCircleIcon as UserCircleIconSolid, BellIcon as BellIconSolid, UsersIcon as UsersIconSolid, CurrencyDollarIcon as CurrencyDollarIconSolid } from '@heroicons/react/24/solid'
import { UserCircleIcon, BellIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { HeadsetIcon } from "lucide-react"

export const tabsList = [
  {
    icon: CurrencyDollarIcon,
    activeIcon: CurrencyDollarIconSolid,
    value: "costs", text: "Costos"
  },
  {
    icon: UserCircleIcon,
    activeIcon: UserCircleIconSolid,
    value: "profile",
    text: "Perfil"
  },
  {
    icon: BellIcon,
    activeIcon: BellIconSolid,
    value: "notifications",
    text: "Notificaciones"
  },
  {
    icon: UsersIcon,
    activeIcon: UsersIconSolid,
    value: "user-management",
    text: "Gestión de usuarios"
  },
  {
    icon: HeadsetIcon,
    activeIcon: HeadsetIcon,
    value: "help",
    text: "Ayuda",
  },
]

export const tabsContent = [
  { value: "costs", content: "" },
  { value: "profile", content: "" },
  { value: "notifications", content: "" },
  { value: "user-management", content: "" },
  { value: "help", content: "" },
]
