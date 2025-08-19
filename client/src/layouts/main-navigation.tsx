"use client"

import NavItem from "@/layouts/nav-item"
import { mainNavigation } from "@/layouts/navigation"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MainNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className={cn(
      "p-1 z-10 bg-background shadow-[0_0_2px_1px_#00000040]",
      "sm:relative sm:rounded-[6px] sm:w-fit",
      "fixed bottom-0 left-0 w-full rounded-none "
    )}>
      <ul className="flex sm:gap-1">
        {mainNavigation.map((item) => {
          return (
            <li key={item.title} className={`w-1/5 sm:w-auto`}>
              <NavItem item={item} isActive={pathname == item.href} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainNavigation
