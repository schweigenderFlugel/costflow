import {
  Box,
  Calculator,
  FlaskConical,
  House,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
};

export const websiteName: NavItem = {
  title: "cotzia",
  href: "/",
  icon: undefined,
};

export const mainNavigation: NavItem[] = [
  { title: "inicio", href: "/dashboard", icon: House },
  { title: "insumos", href: "/insumos", icon: Box },
  { title: "productos", href: "/productos", icon: FlaskConical },
  { title: "calculadora", href: "/calculadora", icon: Calculator },
  { title: "configuración", href: "/configuracion", icon: Settings },
];
