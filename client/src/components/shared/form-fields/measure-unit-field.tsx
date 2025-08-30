import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MeasureUnit } from "@/types/measure/measure-unit";
import { translateMeasureUnit } from "@/utils/translate/shared-translate";
import { Control, FieldValues, Path } from "react-hook-form";

interface MeasureUnitFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  placeholderDisabled?: string;
  availableUnits: string[];
  disabled?: boolean;
  className?: string;
}

export function MeasureUnitField<T extends FieldValues>({
  control,
  name = "measure_unit" as Path<T>,
  label = "Unidad de medida",
  placeholder = "Seleccionar unidad",
  placeholderDisabled = "Selecciona el estado de la materia",
  availableUnits,
  disabled = false,
  className
}: MeasureUnitFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl className={`w-full ${className || ""}`}>
              <SelectTrigger className={className?.includes("truncate") ? "truncate" : ""}>
                <SelectValue
                  placeholder={disabled ? placeholderDisabled : placeholder}
                  defaultValue={"DEFAULT"}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem disabled value={"DEFAULT"}>
                Seleccionar unidad
              </SelectItem>
              {availableUnits.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {translateMeasureUnit(unit as MeasureUnit)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
