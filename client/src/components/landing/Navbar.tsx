"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar5 = () => {
  return (
    <section className="xl:py-7">
      <div className="container mx-auto flex justify-between items-center bg-gray-900/85 xl:rounded-xl text-white p-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
            className="max-h-8 brightness-0 invert"
            alt="COTZIA"
          />
          <span className="text-lg font-semibold tracking-tighter">COTZIA</span>
        </a>

        {/* Links del medio */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex space-x-6 bg-transparent">
            {["Inicio", "Software", "Precios", "Contacto"].map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink
                  href={`#${item.toLowerCase()}`}
                  className="bg-transparent text-white hover:underline hover:text-slate-200 hover:bg-transparent focus:bg-transparent focus:ring-0 px-3 py-1 rounded"
                >
                  {item}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Botón */}
        <div className="hidden lg:flex">
          <Button className="bg-blue-900 hover:bg-blue-700 text-white">
            Probar gratis
          </Button>
        </div>

        {/* Sheet para móvil */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden bg-transparent text-white">
            <Button
              variant="outline"
              size="icon"
              className="text-white border-white"
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="max-h-screen overflow-auto bg-gray-700 text-white"
          >
            <SheetHeader>
              <SheetTitle>
                <a href="#" className="flex items-center gap-2">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                    className="max-h-8 brightness-0 invert"
                    alt="COTZIA"
                  />
                  <span className="text-lg font-semibold tracking-tighter text-white">
                    COTZIA
                  </span>
                </a>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col p-4 gap-4">
              {["Inicio", "Software", "Precios", "Contacto"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-medium text-white hover:bg-gray-600 px-2 py-1 rounded focus:bg-transparent focus:ring-0"
                >
                  {item}
                </a>
              ))}
              <Button className="bg-blue-900 hover:bg-blue-700 text-white">
                Probar gratis
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export { Navbar5 };
