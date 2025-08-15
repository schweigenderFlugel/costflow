import MainNavigation from "@/layouts/main-navigation"
import { websiteName } from "@/layouts/navigation"
import UserNavigation from "@/layouts/user-navigation"
import Link from "next/link"

const Header = () => {
  return (
    <header className="max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5 py-2.5 my-2 flex gap-1 justify-between items-center align-middle">
      <Link href={websiteName.href} className="uppercase min-w-44 border border-foreground py-2 flex items-center align-middle justify-center font-medium text-md">
        {websiteName.icon && <websiteName.icon size={15} />}
        {websiteName.title}
      </Link>

      <MainNavigation />

      <UserNavigation />
    </header>
  )
}

export default Header
