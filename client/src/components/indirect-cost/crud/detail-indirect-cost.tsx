import {
  IndirectCostInput,
  IndirectCostObj,
} from "@/interfaces/interface-indirect-costs";

const DetailIndirectCost = ({
  indirectCost,
}: {
  indirectCost: IndirectCostObj | IndirectCostInput | null;
}) => {
  if (indirectCost === null) return null;
  return (
    <div className="p-4 sm:p-6 bg-muted/70 rounded-xs text-muted-foreground">
      <h3 className="text-base font-medium">Detalles del costo:</h3>
      <p className="mt-2 text-sm flex justify-between px-3">
        <span className="font-semibold">Tipo:</span>
        <span className="font-bold">{indirectCost.type}</span>
      </p>
      <p className="mt-1 text-sm flex justify-between px-3">
        <span className="font-semibold">Monto:</span>
        <span className="font-bold">${indirectCost.amount.toFixed(2)}</span>
      </p>
      <p className="mt-1 text-sm flex justify-between px-3">
        <span className="font-semibold">Uso total:</span>
        <span className="font-bold">{indirectCost.total_usage ?? 1}</span>
      </p>
      <p className="mt-2 text-sm flex justify-between px-3">
        <span className="font-semibold">Fecha:</span>
        <span className="font-bold">
          {new Date(indirectCost.date).toLocaleDateString("es-AR")}
        </span>
      </p>
    </div>
  );
};

export default DetailIndirectCost;
