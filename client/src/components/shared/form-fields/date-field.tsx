"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { es } from "date-fns/locale";
import { FormDataIndirectCost } from "@/types/type-form-data-indirect-cost";

const DateField = ({
  className,
  formControl,
  formatStr,
  fieldClassName,
}: {
  className?: string;
  formControl: Control<FormDataIndirectCost>;
  formatStr?: string;
  fieldClassName?: string;
}) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i); // 5 años atrás y 5 adelante

  return (
    <FormField
      control={formControl}
      name="date"
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>Fecha</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    fieldClassName
                  )}
                >
                  {field.value ? (
                    format(field.value, formatStr ?? "MM/yyyy", { locale: es })
                  ) : (
                    <span>Seleccione una fecha (MM/YY)</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      Mes
                    </label>
                    <Select
                      value={
                        field.value ? field.value.getMonth().toString() : ""
                      }
                      onValueChange={(month) => {
                        const currentDate = field.value || new Date();
                        const newDate = new Date(
                          currentDate.getFullYear(),
                          parseInt(month),
                          1
                        );
                        field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      Año
                    </label>
                    <Select
                      value={
                        field.value ? field.value.getFullYear().toString() : ""
                      }
                      onValueChange={(year) => {
                        const currentDate = field.value || new Date();
                        const newDate = new Date(
                          parseInt(year),
                          currentDate.getMonth(),
                          1
                        );
                        field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Año" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateField;
