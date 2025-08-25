import CardsHome from "@/components/home/cards-home";
import PageHeaderSection from "@/components/shared/page-header-section";

export const metadata = {
  title: "Inicio",
};

const Page = () => {
  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Mi gestión"
        description="Gestioná, calculá y presupuestá desde el mismo lugar"
      />

      <section className="w-6xl max-w-[calc(100svw-2rem)] mx-auto">
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
      </section>
    </main>
  );
};

export default Page;
