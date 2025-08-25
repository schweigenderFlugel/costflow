import CardsHome from "@/components/home/cards-home";
import PageHeaderSection from "@/components/shared/page-header-section";
import StatsChart from "@/components/dashboard/stats-chart";

export const metadata = {
  title: "Dashboard",
};

interface DataSalesProduction {
  month: string;
  sales: number;
  production: number;
}

const data: DataSalesProduction[] | [] = [
  { month: "Ene", sales: 100000, production: 30000 },
  { month: "Feb", sales: 85000, production: 40000 },
  { month: "Mar", sales: 95000, production: 50000 },
  { month: "Abr", sales: 80000, production: 45000 },
  { month: "May", sales: 40000, production: 70000 },
  { month: "Jun", sales: 65000, production: 120000 },
  { month: "Jul", sales: 100000, production: 90000 },
  { month: "Ago", sales: 55000, production: 50000 },
  { month: "Sep", sales: 70000, production: 110000 },
  { month: "Oct", sales: 45000, production: 120000 },
  { month: "Nov", sales: 75000, production: 105000 },
  { month: "Dic", sales: 65000, production: 125000 },
];

const Page = () => {
  return (
    <main className="w-6xl px-4 sm:px-6 lg:px-8 max-w-[calc(100vw-2rem)] mx-auto">
      <PageHeaderSection
        title="Mi gestión"
        description="Gestioná, calculá y presupuestá desde el mismo lugar"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <CardsHome
          title="Ganancias Totales"
          icon="DollarSign"
          color="green"
          percentage="12.5%"
          trend="up"
          description="Comparado con el último mes"
        />

        <CardsHome
          title="Producción total"
          icon="Database"
          color="blue"
          percentage="8.5%"
          trend="up"
          description="Comparado con el último mes"
        />

        <CardsHome
          title="Insumos totales"
          icon="Box"
          color="fuchsia"
          percentage="4.3%"
          trend="down"
          description="Comparado con el último mes"
        />

        <CardsHome
          title="Clientes totales"
          icon="Users"
          color="orange"
          percentage="0%"
          trend="right"
          description="Comparado con el último mes"
          href="/clientes-totales"
        />
      </div>
      <div className="py-6">
        <StatsChart data={data} />
      </div>
    </main>
  );
};

export default Page;
