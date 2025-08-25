import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Contact() {
  const RequiredIndicator = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <section className="w-full py-20 lg:py-28 bg-slate-50" id="contacto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contactanos
          </h2>
        </div>

        <Card className="max-w-4xl mx-auto p-6 md:p-10 shadow-lg rounded-xl">
          <CardContent className="p-0">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8">

              {/* --- Columna Izquierda --- */}
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="name" className="font-semibold">
                    Nombre <RequiredIndicator />
                  </Label>
                  <Input id="name" type="text" placeholder="Colocá tu nombre" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold">
                    Email <RequiredIndicator />
                  </Label>
                  <Input id="email" type="email" placeholder="Colocá tu Email" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold">
                    Teléfono <RequiredIndicator />
                  </Label>
                  <Input id="phone" type="tel" placeholder="Colocá tu número de teléfono" className="mt-2" />
                </div>
              </div>

              {/* --- Columna Derecha --- */}
              <div className="flex flex-col">
                <div className="flex-grow">
                  <Label htmlFor="message" className="font-semibold">
                    Mensaje <RequiredIndicator />
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Escribí tu mensaje..."
                    className="mt-2 h-full min-h-[220px] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-6 bg-[#1E2151] hover:bg-[#2A2E6F] text-white font-bold py-5 text-base"
                >
                  Enviar mensaje
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
