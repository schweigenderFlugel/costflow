import { websiteName } from "@/layouts/navigation"
import { Mail } from "lucide-react"
import Link from "next/link"


const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-auto py-4 hidden sm:block">

      <div className="max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5 py-2.5 flex gap-1 justify-between items-center align-middle">

        <Link href={websiteName.href} className="font-bold text-xl uppercase">{websiteName.title}</Link>

        <p className="text-sm text-muted w-fit md:block hidden">Software de gestión de finanzas</p>

        <div className="text-right text-xs">
          <p className="flex gap-2 justify-end" title="email"><Mail size={16} /> soporte@cotzia.com.ar</p>
          <p title="address">Av. Colonia 150, CABA, Argentina</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
