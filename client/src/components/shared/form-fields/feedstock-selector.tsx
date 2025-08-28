import { useState, useEffect } from "react";
import { useFieldArray, Control, UseFormRegister, FieldErrors, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ObjFeedstock } from "@/types/items/feedstock";
import { useDataQuery } from "@/hooks/use-data-query";
import { translateMeasureUnit } from "@/utils/translate/shared-translate";
import { FormDataProduct } from "@/schemas/product-schema";

interface FeedstockSelectorProps {
  control: Control<FormDataProduct>;
  formRegister: UseFormRegister<FormDataProduct>;
  formErrors: FieldErrors<FormDataProduct>;
}

export function FeedstockSelector({
  control,
  formRegister,
  formErrors
}: FeedstockSelectorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "feedstocks"
  });

  // Usar useWatch para obtener los valores reales del formulario
  const watchedFeedstocks = useWatch({
    control,
    name: "feedstocks"
  });

  // Usar React Query para reutilizar datos cacheados - sin initialData para forzar fetch
  const { data: feedstocks = [], isLoading } = useDataQuery<ObjFeedstock[]>("feedstock", undefined);

  const [filteredFeedstocks, setFilteredFeedstocks] = useState<ObjFeedstock[]>([]);
  const [feedstockSearch, setFeedstockSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtrar insumos cuando cambia la búsqueda, los datos, o los campos seleccionados
  useEffect(() => {
    if (!Array.isArray(feedstocks) || !feedstocks.length) return;

    let filtered = feedstocks;

    // Filtrar por búsqueda
    if (feedstockSearch.trim() !== "") {
      filtered = filtered.filter((fs: ObjFeedstock) =>
        fs.name.toLowerCase().includes(feedstockSearch.toLowerCase())
      );
    }

    // CLAVE: Usar watchedFeedstocks para obtener los IDs reales del formulario
    const addedFeedstockIds = (watchedFeedstocks || []).map((item) => item?.id).filter(Boolean);

    filtered = filtered.filter((fs: ObjFeedstock) => !addedFeedstockIds.includes(fs.id));

    setFilteredFeedstocks(filtered);
  }, [feedstockSearch, feedstocks, watchedFeedstocks]);

  const handleFeedstockSelect = (feedstock: ObjFeedstock) => {
    // Verificar si el insumo ya está seleccionado usando watchedFeedstocks
    const alreadySelected = (watchedFeedstocks || []).some((item) => item?.id === feedstock.id);

    if (alreadySelected) {
      return;
    }

    // Agregar el nuevo insumo al array
    append({
      name: feedstock.name,
      measure_unit: feedstock.measure_unit,
      id: feedstock.id,
      quantity_required: 1
    });

    // Limpiar búsqueda
    setFeedstockSearch("");
    setShowDropdown(false);
  };

  const handleSearchChange = (value: string) => {
    setFeedstockSearch(value);
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
        <Label htmlFor="feedstock-search">Insumos necesarios</Label>
        <div className="relative">
          <Input
            id="feedstock-search"
            placeholder="Buscar insumos..."
            value={feedstockSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />

          {/* Dropdown de insumos */}
          {showDropdown && isLoading && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="px-3 py-2 text-sm text-gray-500">
                Cargando insumos...
              </div>
            </div>
          )}
          {showDropdown && !isLoading && filteredFeedstocks.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredFeedstocks.slice(0, 10).map((feedstock) => (
                <div
                  key={feedstock.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                  onClick={() => handleFeedstockSelect(feedstock)}
                >
                  <h4 className="font-medium truncate">{feedstock.name}</h4>
                </div>
              ))}
            </div>
          )}
          {showDropdown && !isLoading && filteredFeedstocks.length === 0 && feedstockSearch && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="px-3 py-2 text-sm text-gray-500">
                No se encontraron insumos
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista de insumos seleccionados */}
      {fields.length > 0 && (
        <div className="space-y-2">
          <Label>Insumos seleccionados</Label>
          <div className="space-y-3 px-2 max-h-[400px] overflow-y-auto">
            {fields?.map((field, index) => {
              return (
                <Card key={field.id} className="p-3 gap-1.5 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-medium text-sm flex-1 break-words">
                      {field?.name}
                    </h5>
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
                    <Label htmlFor={`quantity-${index}`} className="text-xs whitespace-nowrap">
                      Cantidad:
                    </Label>
                    <div className="relative flex-1">
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        // min=""
                        step="1"
                        className="pr-16"
                        {...formRegister(`feedstocks.${index}.quantity_required`, { valueAsNumber: true })}
                      />
                      {field?.measure_unit && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap">
                          {translateMeasureUnit(field?.measure_unit)}
                        </span>
                      )}
                    </div>
                  </div>

                  {formErrors.feedstocks?.[index]?.quantity_required && (
                    <p className="text-red-500 text-sm mt-2">
                      {formErrors.feedstocks[index]?.quantity_required?.message}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay insumos seleccionados */}
      {fields.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          <p>No hay insumos seleccionados</p>
          <p className="text-sm">Usa el buscador para agregar insumos al producto</p>
        </div>
      )}
    </div>
  );
}
