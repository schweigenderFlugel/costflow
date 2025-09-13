import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MaintenancePage = () => {
  return (
    <div className="pt-3 pb-10 w-full flex items-center justify-center">
      <div className="w-full px-2 sm:px-6 py-8 text-center">
        <div className="relative w-fit mx-auto mb-8">
          <Image
            src="/assets/maintenance/maintenance.png"
            alt="Página en mantenimiento"
            width={380}
            height={292}
            className="w-full h-auto max-w-sm mx-auto"
            priority
          />
        </div>
        <h3 className="text-2xl font-bold text-[#3B3B3B] mb-2">
          Estamos trabajando para mejorar la plataforma.
        </h3>
        <p className="text-muted-foreground mb-8">
          Volvé a intentarlo en unos minutos.
        </p>
        <Button asChild variant="outline">
          <Link href="/inicio">Ir al Inicio</Link>
        </Button>
      </div>
    </div >
  );
}

export default MaintenancePage;
