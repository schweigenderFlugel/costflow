"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";

// T es cualquier tipo que tenga al menos id y quantity
interface QuantityInputProps<T extends { id: string; quantity: number }> {
  item: T;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
}

function QuantityInput<T extends { id: string; quantity: number }>({
  item,
  setItems,
}: QuantityInputProps<T>) {
  const [localQuantity, setLocalQuantity] = React.useState(item.quantity);

  const handleChange = (delta: number) => {
    setLocalQuantity((prev) => Math.max(0, prev + delta));
    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id
          ? { ...p, quantity: Math.max(0, p.quantity + delta) }
          : p
      )
    );
  };

  const handleManualChange = (value: number) => {
    setLocalQuantity(value);
  };

  const handleBlur = () => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, quantity: Math.max(0, localQuantity) } : p
      )
    );
  };

  return (
    <div className="inline-flex items-center gap-2 border shadow-sm rounded-lg px-1">
      <Button
        size="icon"
        variant="outline"
        onClick={() => handleChange(-1)}
        disabled={item.quantity <= 0}
        className="border-none shadow-none font-bold"
      >
        -
      </Button>

      <Input
        type="number"
        className="w-auto min-w-[2ch] text-center p-0 border-none"
        style={{ width: `${String(localQuantity).length + 1}ch` }}
        value={localQuantity}
        onChange={(e) => handleManualChange(Number(e.target.value))}
        onBlur={handleBlur}
        min={0}
      />

      <Button
        size="icon"
        variant="outline"
        onClick={() => handleChange(1)}
        className="border-none shadow-none font-bold"
      >
        +
      </Button>
    </div>
  );
}

export default QuantityInput;
