import { useState, useEffect } from "react";
import { useFieldArray, Control, UseFormRegister, FieldErrors, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { IndirectCostObj } from "@/types/items/indirect-cost";
import { useDataQuery } from "@/hooks/use-data-query";
import { FormDataProduct } from "@/schemas/product-schema";

interface IndirectCostSelectorProps {
  control: Control<FormDataProduct>;
  formRegister: UseFormRegister<FormDataProduct>;
  formErrors: FieldErrors<FormDataProduct>;
}

export function IndirectCostSelector({
  control,
  formRegister,
  formErrors
}: IndirectCostSelectorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "indirect_costs"
  });

  // Usar useWatch para obtener los valores reales del formulario
  const watchedIndirectCosts = useWatch({
    control,
    name: "indirect_costs"
  });

  // Usar React Query para reutilizar datos cacheados - sin initialData para forzar fetch
  const { data: indirectCosts = [], isLoading } = useDataQuery<IndirectCostObj[]>("indirect_cost", undefined);

  const [filteredIndirectCosts, setFilteredIndirectCosts] = useState<IndirectCostObj[]>([]);
  const [indirectCostSearch, setIndirectCostSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Para mostrar información completa de los costos indirectos seleccionados
  const getIndirectCostInfo = (indirectCostId: string) => {
    if (!Array.isArray(indirectCosts)) return undefined;
    return indirectCosts.find((ic: IndirectCostObj) => ic.id === indirectCostId);
  };

  // Filtrar costos indirectos cuando cambia la búsqueda, los datos, o los campos seleccionados
  useEffect(() => {
    if (!Array.isArray(indirectCosts) || !indirectCosts.length) return;

    let filtered = indirectCosts;

    // Filtrar por búsqueda
    if (indirectCostSearch.trim() !== "") {
      filtered = filtered.filter((ic: IndirectCostObj) =>
        ic.type.toLowerCase().includes(indirectCostSearch.toLowerCase())
      );
    }

    // CLAVE: Usar watchedIndirectCosts para obtener los IDs reales del formulario
    const addedIndirectCostIds = (watchedIndirectCosts || []).map((item) => item?.id).filter(Boolean);

    filtered = filtered.filter((ic: IndirectCostObj) => !addedIndirectCostIds.includes(ic.id));

    setFilteredIndirectCosts(filtered);
  }, [indirectCostSearch, indirectCosts, watchedIndirectCosts]);

  const handleIndirectCostSelect = (indirectCost: IndirectCostObj) => {
    // Verificar si el costo indirecto ya está seleccionado usando watchedIndirectCosts
    const alreadySelected = (watchedIndirectCosts || []).some((item) => item?.id === indirectCost.id);

    if (alreadySelected) {
      return;
    }

    // Agregar el nuevo costo indirecto al array
    append({
      id: indirectCost.id,
      usage: 1
    });

    // Limpiar búsqueda
    setIndirectCostSearch("");
    setShowDropdown(false);
  };

  const handleSearchChange = (value: string) => {
    setIndirectCostSearch(value);
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className="col-span-1 space-y-4 h-full">
      <div className="space-y-2">
        <Label htmlFor="indirect-cost-search">Costos indirectos vinculados</Label>
        <div className="relative">
          <Input
            id="indirect-cost-search"
            placeholder="Buscar costos indirectos..."
            value={indirectCostSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />

          {/* Dropdown de costos indirectos */}
          {showDropdown && isLoading && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="px-3 py-2 text-sm text-gray-500">
                Cargando costos indirectos...
              </div>
            </div>
          )}
          {showDropdown && !isLoading && filteredIndirectCosts.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredIndirectCosts.slice(0, 10).map((indirectCost) => (
                <div
                  key={indirectCost.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                  onClick={() => handleIndirectCostSelect(indirectCost)}
                >
                  <h4 className="font-medium truncate">{indirectCost.type}</h4>
                  <p className="text-xs text-gray-500">${indirectCost.amount}</p>
                </div>
              ))}
            </div>
          )}
          {showDropdown && !isLoading && filteredIndirectCosts.length === 0 && indirectCostSearch && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="px-3 py-2 text-sm text-gray-500">
                No se encontraron costos indirectos
              </div>
            </div>
          )}
        </div>
        {formErrors.indirect_costs && (
          <p className="text-red-500 text-sm mt-2">
            {formErrors.indirect_costs.message}
          </p>
        )}
      </div>

      {/* Lista de costos indirectos seleccionados */}
      {fields.length > 0 && (
        <div className="space-y-2">
          <Label>Costos indirectos seleccionados</Label>
          <div className="space-y-3 px-2 max-h-[400px] overflow-y-auto">
            {fields?.map((field, index) => {
              // Usar watchedIndirectCosts para obtener el ID real
              const watchedItem = watchedIndirectCosts?.[index];
              const indirectCostInfo = getIndirectCostInfo(watchedItem?.id);
              return (
                <Card key={field.id} className="p-3 gap-1.5 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm break-words">
                        {indirectCostInfo?.type || 'Costo indirecto'}
                      </h5>
                      {indirectCostInfo && (
                        <p className="text-xs text-gray-500">
                          Monto: ${indirectCostInfo.amount}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer size-fit py-1 hover:bg-red-200 transition-colors duration-200"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`usage-${index}`} className="text-xs whitespace-nowrap">
                      Uso:
                    </Label>
                    <Input
                      id={`usage-${index}`}
                      type="number"
                      min="1"
                      step="1"
                      className="pr-12"
                      {...formRegister(`indirect_costs.${index}.usage`, { valueAsNumber: true })}
                    />
                  </div>

                  {formErrors.indirect_costs?.[index]?.usage && (
                    <p className="text-red-500 text-sm mt-2">
                      {formErrors.indirect_costs[index]?.usage?.message}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay costos indirectos seleccionados */}
      {fields.length === 0 && (
        <div className="text-center py-6 px-2 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-sm">No hay costos seleccionados</p>
          <p className="text-xs">Usa el buscador para agregar costos indirectos al producto</p>
        </div>
      )}

    </div>
  );
}
