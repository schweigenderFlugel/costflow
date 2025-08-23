import CardsHome from "@/components/home/cards-home";
import PageHeaderSection from "@/components/shared/page-header-section";

export const metadata = {
  title: "Inicio",
};

const Page = () => {
  return (
    <main className="w-6xl px-4 sm:px-6 lg:px-8 max-w-[calc(100vw-2rem)] mx-auto">
      <PageHeaderSection
        title="Mi gestión"
        description="Gestioná, calculá y presupuestá desde el mismo lugar"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </main>
  );
};

export default Page;
