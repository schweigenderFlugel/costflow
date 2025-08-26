import PageHeaderSection from "@/components/shared/page-header-section";
import StatsChart from "@/components/dashboard/stats-chart";
import DashboardCards from "@/components/home/dashboard-cards";

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

const dashboardStats = {
  revenue: { percentage: "12.5%", value: "$300 ARS" },
  production: { percentage: "8.5%", value: "500 unidades" },
  supplies: { percentage: "-4.3%", value: "50 insumos" },
  customers: {
    percentage: "0%",
    value: "12 clientes",
    href: "/clientes-totales",
  },
};

const Page = () => {
  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Mi gestión"
        description="Gestioná, calculá y presupuestá desde el mismo lugar"
      />
      <section className="w-6xl max-w-[calc(100svw-2rem)] mx-auto">
        <DashboardCards data={dashboardStats} />
      </section>

      <section className="w-6xl max-w-[calc(100svw-2rem)] mx-auto py-6">
        <StatsChart data={data} />
      </section>

    </main>
  );
};

export default Page;
