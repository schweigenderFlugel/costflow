export interface ItemToastData {
  description: string;
  type?:
    | "insumo"
    | "producto"
    | "registro"
    | "inicio de sesión"
    | "usuario"
    | "costo indirecto"
    | "recuperación"
    | "contraseña";
  duration?: number;
}
