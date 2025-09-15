import MainNavigation from "@/layouts/main-navigation"
import { websiteName } from "@/layouts/navigation"
import UserNavigation from "@/layouts/user-navigation"
import { hasToken } from "@/utils/get-token"
import { headers } from "next/headers"
import Image from "next/image"

const Header = async () => {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || ''

  // No mostrar header en la ruta raíz
  if (pathname === '/') return null

  const isConnect = await hasToken()
  if (!isConnect) return null;

  return (
    <header className="max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5 py-2.5 my-2 flex gap-1 justify-between items-center align-middle">
      <a href={websiteName.href} className="flex items-center">
        {websiteName.svgIcon && <Image
          src={websiteName.svgIcon}
          alt="Logo"
          width={112}
          height={41}
          className="max-h-8 w-20 md:w-26"
        />}
      </a>

      <MainNavigation />

      <UserNavigation />
    </header>
  )
}

export default Header
