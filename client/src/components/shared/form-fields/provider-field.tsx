import { useState, useMemo } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { useDataQuery } from "@/hooks/use-data-query";
import { ObjFeedstock } from "@/types/items/feedstock";

interface ProviderFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  optional?: boolean;
}

export function ProviderField<T extends FieldValues>({
  control,
  name = "provider" as Path<T>,
  label = "Proveedor",
  placeholder = "Nombre o alias del proveedor",
  optional = true
}: ProviderFieldProps<T>) {
  // Obtener datos de feedstock para extraer proveedores únicos
  const { data: feedstocks = [] } = useDataQuery<ObjFeedstock[]>("feedstock", undefined);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Extraer proveedores únicos de los feedstocks
  const uniqueProviders = useMemo(() => {
    if (!Array.isArray(feedstocks)) return [];

    const providers = feedstocks
      .map(fs => fs.provider)
      .filter((provider): provider is string => Boolean(provider?.trim()))
      .map(provider => provider.trim());

    // Eliminar duplicados (case-insensitive) y ordenar
    const uniqueSet = new Set(providers.map(p => p.toLowerCase()));
    return Array.from(uniqueSet)
      .map(lowerProvider => {
        // Encontrar la versión original (con mayúsculas/minúsculas) del proveedor
        return providers.find(p => p.toLowerCase() === lowerProvider) || lowerProvider;
      })
      .sort();
  }, [feedstocks]);

  // Filtrar proveedores basado en el input actual
  const filteredProviders = useMemo(() => {
    if (!inputValue.trim()) return uniqueProviders.slice(0, 5); // Mostrar los primeros 5 si no hay búsqueda

    return uniqueProviders
      .filter(provider =>
        provider.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 8); // Limitar a 8 sugerencias
  }, [uniqueProviders, inputValue]);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {optional && (
              <span className="text-xs text-muted-foreground"> (Opcional)</span>
            )}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  setInputValue(value);
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  setInputValue(field.value || "");
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  // Retrasar el cierre para permitir clicks en las sugerencias
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onKeyDown={(e) => {
                  // Cerrar sugerencias con Escape
                  if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
                autoComplete="off"
              />

              {/* Dropdown con sugerencias de proveedores */}
              {showSuggestions && filteredProviders.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                  {filteredProviders.map((provider, index) => (
                    <div
                      key={`${provider}-${index}`}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                      onClick={() => {
                        field.onChange(provider);
                        setInputValue(provider);
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="font-medium">{provider}</span>
                    </div>
                  ))}

                  {/* Indicador de que se puede escribir uno nuevo */}
                  {inputValue.trim() && !filteredProviders.some(p => p.toLowerCase() === inputValue.toLowerCase()) && (
                    <div className="px-3 py-2 text-xs text-gray-500 border-t bg-gray-50">
                      <span className="italic">
                        Presiona Enter para usar &quot;{inputValue}&quot; como nuevo proveedor
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
