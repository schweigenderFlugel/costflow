"use client";
import {
  CurrencyDollarIcon as CurrencyDollarIconSolid,
  CircleStackIcon as CircleStackIconSolid,
  CubeIcon as CubeIconSolid,
} from "@heroicons/react/24/solid";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
  CircleStackIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfoCardInterface } from "@/interfaces/interface-info-card";
import { InfoCardProps } from "@/interfaces/interface-info-card-props";

const infoCards: Record<"dollar" | "product" | "feedstock", InfoCardInterface> =
  {
    dollar: {
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#308B00]",
      Icon: CurrencyDollarIcon,
      SolidIcon: CurrencyDollarIconSolid,
    },
    product: {
      iconBg: "bg-[#E2EEF9]",
      iconColor: "text-primary",
      Icon: CircleStackIcon,
      SolidIcon: CircleStackIconSolid,
    },
    feedstock: {
      iconBg: "bg-[#FAC2FF]",
      iconColor: "text-[#6E0078]",
      Icon: CubeIcon,
      SolidIcon: CubeIconSolid,
    },
  } as const;

const InfoCard: React.FC<InfoCardProps> = ({
  type,
  value,
  secondValue,
  description,
  percentage,
}) => {
  const { iconBg, iconColor, Icon, SolidIcon } = infoCards[type];

  //  hardcodeado xd
  const numericPercentage = percentage ? parseFloat(percentage) : 0;

  let trend: "up" | "down" | "right";
  let trendColor: string;
  let hover: string;

  if (numericPercentage > 0) {
    trend = "up";
    trendColor = "text-[#308B00]";
  } else if (numericPercentage < 0) {
    trend = "down";
    trendColor = "text-[#B2401E]";
  } else {
    trend = "right";
    trendColor = "text-blue-700";
  }

  switch (type) {
    case "dollar":
      hover =
        "hover:bg-[#DCFCE7]/50 focus:bg-[#DCFCE7]/50 hover:dark:bg-[#A5D6A7]/50 focus:dark:bg-[#A5D6A7]/50";
      break;
    case "product":
      hover =
        "hover:bg-[#E2EEF9]/50 focus:bg-[#E2EEF9]/50 hover:dark:bg-[#A5D6A7]/50 focus:dark:bg-[#A5D6A7]/50";
      break;
    case "feedstock":
      hover =
        "hover:bg-[#FAC2FF]/50 focus:bg-[#FAC2FF]/50 hover:dark:bg-[#A5D6A7]/50 focus:dark:bg-[#A5D6A7]/50";
      break;
    default:
      hover =
        "hover:bg-muted-foreground/10 hover:dark:bg-muted-foreground/20 focus:bg-muted-foreground/10";
  }

  return (
    <Card
      className={`shadow-sm hover:shadow-md ${hover} cursor-pointer transition w-full max-w-[calc(100%-2rem)] gap-1.5 md:gap-5 group py-4 md:py-6`}
    >
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className={`${iconBg} ${iconColor} inline-block rounded-[8px] p-2 relative`}
          >
            <Icon className="size-7 group-hover:opacity-0 transition-opacity duration-200" />
            <SolidIcon className="size-7 absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <CardTitle className="text-muted-foreground">
            {type === "dollar"
              ? "Dólar actual"
              : type === "product"
              ? "Productos Totales"
              : "Materia prima en stock"}
          </CardTitle>
        </div>

        {percentage && (
          <div
            className={`flex items-center gap-1 ${trendColor} text-sm font-medium`}
          >
            {trend === "up" && <ArrowUpIcon className={"size-4"} />}
            {trend === "down" && <ArrowDownIcon className={"size-4"} />}
            {trend === "right" && <ArrowRightIcon className={"size-4"} />}
            <p>{percentage}</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="text-foreground">
        {type === "dollar" ? (
          <div className="flex justify-between items-center gap-3 h-full">
            <div>
              <span className="text-sm text-muted-foreground">Compra</span>
              <h4 className="font-bold text-2xl md:text-xl lg:text-2xl">
                {value}
              </h4>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Venta</span>
              <h4 className="font-bold text-2xl md:text-xl lg:text-2xl">
                {secondValue}
              </h4>
            </div>
          </div>
        ) : (
          <h3 className="font-bold text-3xl md:text-4xl">{value}</h3>
        )}
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        <p>{description}</p>
      </CardFooter>
    </Card>
  );
};

export default InfoCard;
