import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StateMatterFieldProps } from "@/interfaces/interface-state-matter-field-props";
import { StateMatter } from "@/types/measure/measure-unit";
import { translateStateMatter } from "@/utils/translate/shared-translate";
import { FieldValues, Path } from "react-hook-form";

export function StateMatterField<T extends FieldValues>({
  control,
  name = "state" as Path<T>,
  label = "Estado de la materia",
  placeholder = "Seleccionar estado",
  onStateChange,
  disabled = false,
}: StateMatterFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onStateChange?.(value as StateMatter);
            }}
            value={field.value}
            disabled={disabled}
          >
            <FormControl className="w-full">
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(StateMatter).map((state) => (
                <SelectItem key={state} value={state}>
                  {translateStateMatter(state)}
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
