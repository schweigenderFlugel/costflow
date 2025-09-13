import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkuFieldProps } from "@/interfaces/interface-sku-field-props";
import { FieldValues, Path } from "react-hook-form";
import { Shuffle } from "lucide-react";

// Función por defecto para generar SKU
const generateDefaultSku = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `SKU-${timestamp}-${random}`;
};

export function SkuField<T extends FieldValues>({
  control,
  name = "sku" as Path<T>,
  label = "SKU",
  placeholder = "Código referencial",
  showGenerateButton = true,
  onGenerateSku = generateDefaultSku,
}: SkuFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input placeholder={placeholder} {...field} />
              {showGenerateButton && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newSku = onGenerateSku();
                    field.onChange(newSku);
                  }}
                  title="Generar SKU automáticamente"
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
