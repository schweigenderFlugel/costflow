# Componentes de Formulario Optimizados

Esta estructura modular permite reutilizar código entre diferentes formularios de la aplicación.

## Estructura

### `/hooks/form/`
- `use-measure-unit-logic.ts`: Hook personalizado que maneja la lógica de estado de materia y unidades de medida

### `/components/shared/form-fields/`
Componentes reutilizables para campos de formulario:

- `sku-field.tsx`: Campo para SKU
- `name-field.tsx`: Campo para nombre
- `quantity-field.tsx`: Campo para cantidad numérica
- `unit-cost-field.tsx`: Campo para costo unitario
- `provider-field.tsx`: Campo para proveedor
- `description-field.tsx`: Campo para descripción (con textarea)
- `state-matter-field.tsx`: Select para estado de la materia
- `measure-unit-field.tsx`: Select para unidades de medida (dependiente del estado)
- `currency-field.tsx`: Select para moneda
- `feedstock-selector.tsx`: Componente completo para búsqueda y selección de insumos

## Beneficios

1. **Reutilización de código**: Los campos comunes se pueden usar en múltiples formularios
2. **Mantenibilidad**: Cambios en un campo se propagan automáticamente a todos los formularios
3. **Consistencia**: Todos los formularios tienen el mismo aspecto y comportamiento
4. **Tipado fuerte**: TypeScript asegura el uso correcto de los componentes
5. **Hooks personalizados**: Lógica compleja extraída a hooks reutilizables

## Uso

```tsx
import {
  SkuField,
  NameField,
  StateMatterField,
  MeasureUnitField
} from "@/components/shared/form-fields";

import { useMeasureUnitLogic } from "@/hooks/form/use-measure-unit-logic";

// En el componente
const { selectedState, getAvailableMeasureUnits, handleStateChange } = useMeasureUnitLogic({
  watch: form.watch,
  setValue: form.setValue
});

// Uso de los campos
<SkuField control={form.control} />
<NameField control={form.control} />
<StateMatterField
  control={form.control}
  onStateChange={handleStateChange}
/>
<MeasureUnitField
  control={form.control}
  availableUnits={getAvailableMeasureUnits()}
  disabled={!selectedState}
/>
```

## Componentes Optimizados

- **FormFeedstock**: Reducido de ~230 líneas a ~60 líneas
- **ProductForm**: Reducido de ~420 líneas a ~85 líneas

Total de líneas reducidas: **~505 líneas** de código duplicado eliminadas.
