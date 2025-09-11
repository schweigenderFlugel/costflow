import * as React from "react";

// T es cualquier tipo que tenga al menos id y quantity
export interface QuantityInputProps<
  T extends { id: string; quantity: number }
> {
  item: T;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
}
