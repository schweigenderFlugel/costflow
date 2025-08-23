import UserTable from "@/components/users/user-table";
import PageHeaderSection from "@/components/shared/page-header-section";
import PageInfoDialog from "@/components/shared/page-info-dialog";

export const metadata = {
  title: "Usuarios",
};

const infoList = [
  { heading: "Nombre", description: "Nombre completo del usuario." },
  { heading: "Email", description: "Correo electrónico del usuario." },
  { heading: "Rol", description: "Administrador o empleado." },
  { heading: "Puesto", description: "Área o puesto de trabajo." },
  { heading: "Estado", description: "Pendiente, aceptado o rechazado." },
];

const Page = () => {
  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Usuarios"
        description="Administrá todos los usuarios, aceptá o rechazá nuevos registros y consultá su información."
        triggerInfo
      />
      <UserTable />

      <PageInfoDialog
        heading="¿De qué se trata esta sección?"
        description={
          <>
            Acá vas a ver todos los <strong>usuarios registrados</strong> y
            podés manejar su estado de aprobación.
          </>
        }
      >
        <div className="space-y-3">
          <h3 className="font-semibold">
            Cada usuario tiene su propia ficha con información clave:
          </h3>
          <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
            {infoList.map((item, index) => (
              <li key={index}>
                <strong>{item.heading}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
      </PageInfoDialog>
    </main>
  );
};

export default Page;
