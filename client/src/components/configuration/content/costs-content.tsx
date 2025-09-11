import { Suspense } from "react";
import IndirectCostTable from "@/components/indirect-cost/indirect-cost-table";
import dynamic from "next/dynamic";
import { IndirectCostObj } from "@/interfaces/interface-indirect-costs";

const AddIndirectCost = dynamic(
  () => import("@/components/indirect-cost/crud/add-indirect-cost")
);
const UpdateIndirectCost = dynamic(
  () => import("@/components/indirect-cost/crud/update-indirect-cost")
);
const DeleteIndirectCost = dynamic(
  () => import("@/components/indirect-cost/crud/delete-indirect-cost")
);

const CostsContent = ({ getData }: { getData: Promise<IndirectCostObj[]> }) => {
  return (
    <>
      <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
        <IndirectCostTable getData={getData} />
      </section>

      <Suspense>
        <AddIndirectCost />
        <UpdateIndirectCost />
        <DeleteIndirectCost />
      </Suspense>
    </>
  );
};

export default CostsContent;
