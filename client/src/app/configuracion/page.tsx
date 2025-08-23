import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Link as LinkIcon } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Configuración"
}

const Page = () => {
  return (
    <main className="space-y-8 py-10 min-h-[70svh] items-center content-center">
      {/* Página en progreso */}
      <Image
        src={"https://media.tenor.com/y-XNYFHZLgQAAAAM/homer-simpson.gif"}
        alt="homer-simpson"
        width={220}
        height={165}
        className="mx-auto"
        unoptimized
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          Página en desarollo
        </h1>
        <p className="text-center text-muted-foreground">
          Esta página está en construcción. Por favor, vuelve más tarde.
        </p>
        <Link href="/"
          className={buttonVariants({ variant: "outline" })}
        >
          <LinkIcon />
          Volver a la página principal
        </Link>
      </div>
    </main>
  )
}

export default Page
