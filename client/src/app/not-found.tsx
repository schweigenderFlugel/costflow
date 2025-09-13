import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pb-10 w-full flex items-center justify-center">
      <div className="max-w-lg w-full px-2 sm:px-6 py-8 text-center">
        <div className="relative w-fit mx-auto mb-8">
          <Image
            src="/assets/maintenance/not-found.png"
            alt="404 - Página no encontrada"
            width={380}
            height={292}
            className="w-full h-auto max-w-sm mx-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-[#3B3B3B] mb-2">¡Ups! La página que buscabas no existe.</h1>
        <p className="text-gray-600 mb-8">
          Es posible que la página que buscas haya sido eliminada o no esté disponible temporalmente.
        </p>
        <Button asChild variant={"link"} className="font-semibold text-lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
