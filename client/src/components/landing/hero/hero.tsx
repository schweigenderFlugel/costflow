import { Button } from "@/components/ui/button";
import { HeroTables } from "./hero-tables";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-8 overflow-hidden bg-[#0D1117]" id="inicio">
      {/* Gradientes del fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/50 rounded-full filter blur-[150px] opacity-30"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/50 rounded-full filter blur-[150px] opacity-30"></div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Columna Izquierda */}
        <div className="flex flex-col gap-6 text-center md:text-left my-20">
          <div className="flex flex-row items-center gap-5 justify-center md:justify-start">
            {/* Logo */}
            <div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                className="xl:size-34 size-26 brightness-0 invert"
                alt="COTZIA"
              />
            </div>

            <span className="text-5xl xl:text-6xl font-bold text-white">
              COTZIA
            </span>
          </div>

          <h1 className="text-4xl md:text-4xl font-bold mt-12 text-white tracking-tight">
            Gestioná tu negocio sin complicaciones
          </h1>
          <p className="text-lg text-slate-400">
            Un software simple y potente para administrar insumos, productos y
            generar presupuestos automáticos en segundos.
          </p>
          <div className="mt-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-slate-200 font-bold text-base px-8 py-6"
            >
              Comenzar ahora
            </Button>
          </div>
        </div>

        {/* Columna Derecha */}
        <HeroTables />
      </div>
    </section>
  );
}
