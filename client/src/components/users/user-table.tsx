import GenericDataTable from "@/components/shared/data-table/generic-data-table";
import { columns } from "@/components/users/columns";
import { UsersData } from "@/interfaces/interface-users";
import { mockUsers } from "@/components/users/mock-users";
import { use } from "react";

const UserTable = ({
  getData,
}: {
  className?: string;
  getData: Promise<UsersData[]>;
}) => {
  const data: UsersData[] | { error?: string; detail?: string } =
    use<UsersData[]>(getData);

  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
      {"error" in data || "detail" in data ? (
        <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
          <p className="text-red-400">
            Mensaje del servidor:{" "}
            {
              new String(
                "error" in data
                  ? data.error
                  : "detail" in data
                  ? data.detail
                  : ""
              )
            }
          </p>
          <p className="text-xs text-muted-foreground">
            Usando datos de prueba
          </p>
        </div>
      ) : null}
      <GenericDataTable<UsersData>
        initialData={!("error" in data || "detail" in data) ? data : mockUsers}
        columns={columns}
        columnsTo="users"
      />
    </section>
  );
};

export default UserTable;
