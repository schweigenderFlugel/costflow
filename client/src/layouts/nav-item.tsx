import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItem as NavItemProp } from "@/types/type-nav-item";

const NavItem = ({
  item,
  isActive,
}: {
  item: NavItemProp;
  isActive: boolean;
}) => {
  return (
    <Link
      aria-label={"link to " + item.title}
      href={item.href}
      title={item.title.toUpperCase()[0] + item.title.slice(1)}
      className={cn(
        "flex sm:flex-row flex-col items-center capitalize rounded-[6px]",
        "py-2 px-1 sm:px-3 gap-1 sm:gap-2 text-xs sm:text-sm font-light",
        "hover:outline transition",
        isActive ? "bg-primary sm:font-normal text-primary-foreground" : ""
      )}
    >
      {item.icon && item.activeIcon ? (
        isActive ? (
          <item.activeIcon className="size-4 sm:size-5 md:hidden lg:block lg:size-4" />
        ) : (
          <item.icon className="size-4 sm:size-5 md:hidden lg:block lg:size-4" />
        )
      ) : null}
      <span
        aria-label={item.title}
        className={cn(
          "truncate px-0.5 sm:px-0 w-full sm:w-auto text-center",
          "block sm:hidden md:inline lg:inline"
        )}
      >
        {item.title}
      </span>
    </Link>
  );
};

export default NavItem;
