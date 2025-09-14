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
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar5 = () => {
  return (
    <header className="xl:py-7 fixed top-0 bottom-0 z-50 w-full h-fit" data-scroll-behavior="smooth">
      <nav className="container mx-auto flex justify-between items-center bg-gray-800/85 xl:rounded-xl text-white p-4">
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
        <NavigationMenu className="hidden md:block">
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
          <Button asChild className="bg-blue-900 hover:bg-blue-700 text-white">
            <Link href={"/inicio-de-sesion"}>
              Probar gratis
            </Link>
          </Button>
        </div>

        {/* Sheet para móvil */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden bg-transparent text-white">
            <Button
              variant="outline-ghost"
              size="icon"
              className="text-text-white hover:text-white"
            >
              <MenuIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="max-h-screen overflow-auto bg-gray-700 text-white border-none"
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
            <div className="flex flex-col py-4 px-2 gap-4">
              {["Inicio", "Software", "Precios", "Contacto"].map((item) => (
                <SheetClose key={item} asChild>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="font-medium text-white hover:bg-gray-600 p-3 rounded focus:bg-transparent focus:ring-0"
                  >
                    {item}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose key={"probar-gratis"} asChild>
                <Button className="bg-blue-900 hover:bg-blue-700 text-white text-md py-6" asChild>
                  <Link href={"/inicio-de-sesion"} >
                    Probar gratis
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export { Navbar5 };
