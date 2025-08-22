import GenericDataTable from "@/components/data-table/generic-data-table";
import { columns } from "@/components/users/columns";
import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { UsersData } from "@/types/items/users";
import { mockUsers } from "@/components/users/mock-users";

const getData = async () => {
  const token = await getToken();

  if (!token) {
    return { error: "No estas autorizado." };
  }

  return await fetcher({
    input: `${process.env.SERVER_API}/users`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache",
    next: {
      tags: ["feedstocks"],
    },
  });
};

const UserTable = async () => {
  const data = await getData();

  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
      {data.detail && (
        <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
          <p className="text-red-400">Mensaje del servidor: {data.detail}</p>
          <p className="text-xs text-muted-foreground">
            Usando datos de prueba
          </p>
        </div>
      )}
      <GenericDataTable<UsersData>
        initialData={!(data.detail || data.error) ? data : mockUsers}
        columns={columns}
        columnsTo="users"
      />
    </section>
  );
};

export default UserTable;
