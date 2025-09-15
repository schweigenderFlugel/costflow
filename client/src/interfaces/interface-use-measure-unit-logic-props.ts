import {
  UseFormSetValue,
  UseFormWatch,
  FieldValues,
  Path,
} from "react-hook-form";

export interface UseMeasureUnitLogicProps<T extends FieldValues> {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  stateFieldName?: Path<T>;
  measureUnitFieldName?: Path<T>;
}
