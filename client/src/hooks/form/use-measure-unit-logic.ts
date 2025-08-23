import { useCallback } from "react";
import {
  StateMatter,
  SolidMeasure,
  LiquidMeasure,
  GasMeasure
} from "@/types/measure/measure-unit";
import { UseFormSetValue, UseFormWatch, FieldValues, Path, PathValue } from "react-hook-form";

interface UseMeasureUnitLogicProps<T extends FieldValues> {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  stateFieldName?: Path<T>;
  measureUnitFieldName?: Path<T>;
}

export function useMeasureUnitLogic<T extends FieldValues>({
  watch,
  setValue,
  stateFieldName = "state" as Path<T>,
  measureUnitFieldName = "measure_unit" as Path<T>
}: UseMeasureUnitLogicProps<T>) {
  const selectedState = watch(stateFieldName);

  const getAvailableMeasureUnits = useCallback(() => {
    switch (selectedState) {
      case StateMatter.SOLID:
        return Object.values(SolidMeasure);
      case StateMatter.LIQUID:
        return Object.values(LiquidMeasure);
      case StateMatter.GASEOUS:
        return Object.values(GasMeasure);
      default:
        return [];
    }
  }, [selectedState]);

  const handleStateChange = useCallback((value: StateMatter) => {
    setValue(stateFieldName, value as PathValue<T, typeof stateFieldName>);
    setValue(measureUnitFieldName, "DEFAULT" as PathValue<T, typeof measureUnitFieldName>);
  }, [setValue, stateFieldName, measureUnitFieldName]);

  return {
    selectedState,
    getAvailableMeasureUnits,
    handleStateChange
  };
}
