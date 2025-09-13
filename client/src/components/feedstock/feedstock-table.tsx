"use server";
import GenericDataTable from "@/components/shared/data-table/generic-data-table";
import columns from "@/components/feedstock/columns";
import { mockFeedstocks } from "@/components/feedstock/mock-feedstocks";
import getFeedstocks from "@/components/feedstock/get-feedstocks";
import { ObjFeedstock } from "@/interfaces/interface-obj-feedstock";

const FeedstockTable = async () => {
  const data = await getFeedstocks();

  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
      {(data.error || data.detail) && (
        <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
          <p className="text-red-400">
            Mensaje del servidor: {data.detail || data.error}
          </p>
          <p className="text-xs text-muted-foreground">
            Usando datos de prueba
          </p>
        </div>
      )}
      <GenericDataTable<ObjFeedstock>
        initialData={!(data.detail || data.error) ? data : mockFeedstocks}
        columns={columns}
      />
    </section>
  );
};

export default FeedstockTable;
