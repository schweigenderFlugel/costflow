"use client";

import CardsHome from "@/components/home/cards-home";

interface DashboardCardsProps {
  data: {
    revenue: { percentage: string; value: string; href?: string };
    production: { percentage: string; value: string; href?: string };
    supplies: { percentage: string; value: string; href?: string };
    customers: { percentage: string; value: string; href?: string };
  };
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
      <CardsHome
        title="Ganancias Totales"
        icon="DollarSign"
        percentage={data.revenue.percentage}
        value={data.revenue.value} // 👈
        description="Comparado con el último mes"
        iconBg="bg-green-100"
        iconColor="text-green-700"
        href={data.revenue.href}
      />

      <CardsHome
        title="Producción total"
        icon="Database"
        percentage={data.production.percentage}
        value={data.production.value} // 👈
        description="Comparado con el último mes"
        iconBg="bg-blue-100"
        iconColor="text-blue-700"
        href={data.production.href}
      />

      <CardsHome
        title="Insumos totales"
        icon="Box"
        percentage={data.supplies.percentage}
        value={data.supplies.value} // 👈
        description="Comparado con el último mes"
        iconBg="bg-fuchsia-100"
        iconColor="text-fuchsia-700"
        href={data.supplies.href}
      />

      <CardsHome
        title="Clientes totales"
        icon="Users"
        percentage={data.customers.percentage}
        value={data.customers.value} // 👈
        description="Comparado con el último mes"
        iconBg="bg-orange-100"
        iconColor="text-orange-700"
        href={data.customers.href}
      />
    </div>
  );
};

export default DashboardCards;
