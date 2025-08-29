"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import Link from "next/link";

const Navbar5 = () => {
  return (
    <section className="xl:py-7 fixed top-0 bottom-0 z-50 w-full h-fit" data-scroll-behavior="smooth">
      <div className="container mx-auto flex justify-between items-center bg-gray-800/85 xl:rounded-xl text-white p-4">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
            className="max-h-8 brightness-0 invert"
            alt="COTZIA"
            width={32}
            height={32}
          />
          <span className="text-lg font-semibold tracking-tighter">COTZIA</span>
        </Link>

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
                <Link href="#" className="flex items-center gap-2">
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                    className="max-h-8 brightness-0 invert"
                    alt="COTZIA"
                    width={32}
                    height={32}
                  />
                  <span className="text-lg font-semibold tracking-tighter text-white">
                    COTZIA
                  </span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col p-4 gap-4">
              {["Inicio", "Software", "Precios", "Contacto"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-medium text-white hover:bg-gray-600 px-2 py-1 rounded focus:bg-transparent focus:ring-0"
                >
                  {item}
                </Link>
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
