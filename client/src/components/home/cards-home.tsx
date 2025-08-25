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

interface CardsHomeProps {
  title: string;
  icon: IconName;
  percentage: string;
  description: string;
  value: string; // 👈 nuevo
  href?: string;
  iconBg?: string;
  iconColor?: string;
}

const CardsHome: React.FC<CardsHomeProps> = ({
  title,
  icon,
  percentage,
  description,
  value,
  href,
  iconBg = "bg-gray-100",
  iconColor = "text-gray-700",
}) => {
  const Icon: LucideIcon = icons[icon];
  const numericPercentage = parseFloat(percentage);

  let trend: "up" | "down" | "right";
  let trendColor: string;

  if (numericPercentage > 0) {
    trend = "up";
    trendColor = "text-green-700";
  } else if (numericPercentage < 0) {
    trend = "down";
    trendColor = "text-red-700";
  } else {
    trend = "right";
    trendColor = "text-blue-700";
  }

  const cardContent = (
    <Card className="shadow-sm cursor-pointer hover:shadow-md transition">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={`${iconBg} ${iconColor} inline-block rounded-2xl p-2 w-fit`}
            >
              <Icon />
            </div>
            <CardTitle className="text-gray-500">{title}</CardTitle>
          </div>

          <div className={`flex items-center gap-1 ${trendColor}`}>
            {trend === "up" && <ArrowUp size={14} />}
            {trend === "down" && <ArrowDown size={14} />}
            {trend === "right" && <ArrowRight size={14} />}
            <p>{percentage}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-black font-bold text-lg">{value}</p> {/* 👈 nuevo */}
        <p className="text-gray-500 text-sm">{description}</p>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
};

export default CardsHome;
