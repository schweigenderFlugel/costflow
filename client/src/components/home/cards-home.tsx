"use client";

import Link from "next/link";
import {
  DollarSign,
  Users,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  LucideIcon,
  Database,
  Box,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const icons = {
  DollarSign,
  Users,
  ShoppingCart,
  Database,
  Box,
} as const;

type IconName = keyof typeof icons;
type ColorName =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "gray"
  | "fuchsia"
  | "orange";

interface CardsHomeProps {
  title: string;
  icon: IconName;
  color?: ColorName;
  percentage: string;
  trend?: "up" | "down" | "right";
  description: string;
  href?: string;
}

const CardsHome: React.FC<CardsHomeProps> = ({
  title,
  icon,
  color = "green",
  percentage,
  trend = "up",
  description,
  href,
}) => {
  const Icon: LucideIcon = icons[icon];

  const colors: Record<ColorName, { bg: string; text: string }> = {
    green: { bg: "bg-green-100", text: "text-green-700" },
    red: { bg: "bg-red-100", text: "text-red-700" },
    blue: { bg: "bg-blue-100", text: "text-blue-700" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-700" },
    gray: { bg: "bg-gray-100", text: "text-gray-700" },
    fuchsia: { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
    orange: { bg: "bg-orange-100", text: "text-orange-700" },
  };

  const c = colors[color];

  const cardContent = (
    <Card className={`shadow-sm cursor-pointer hover:shadow-md transition`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={`${c.bg} inline-block ${c.text} rounded-2xl p-2 w-fit`}
            >
              <Icon />
            </div>
            <CardTitle className="text-gray-500">{title}</CardTitle>
          </div>

          <div
            className={`flex items-center gap-1 ${
              trend === "up"
                ? "text-green-700"
                : trend === "down"
                ? "text-red-700"
                : "text-blue-700"
            }`}
          >
            {trend === "up" && <ArrowUp size={14} />}
            {trend === "down" && <ArrowDown size={14} />}
            {trend === "right" && <ArrowRight size={14} />}
            <p>{percentage}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-gray-500 text-sm">{description}</CardContent>
    </Card>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
};

export default CardsHome;
