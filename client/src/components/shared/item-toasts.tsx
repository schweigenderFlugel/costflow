import { toast } from "sonner";
import { Info } from "lucide-react";
import { ItemToastData } from "@/interfaces/interface-item-toast-data";

export const itemToasts = {
  // Toast para eliminación exitosa
  deleteSuccess: ({
    description,
    type = "insumo",
    duration = 5000,
  }: ItemToastData) => {
    toast.success(
      `¡${
        type.charAt(0).toUpperCase() + type.slice(1)
      } eliminado exitosamente!`,
      {
        description: (
          <div className="flex items-center gap-2">
            <span className="font-normal text-muted-foreground">
              {description}
            </span>
          </div>
        ),
        duration,
        className: "!bg-gradient-to-r !from-red-50 !to-red-100",
        action: {
          label: "Deshacer",
          onClick: () => {
            toast.info("Función de deshacer", {
              description: "Esta funcionalidad estará disponible próximamente",
              icon: <Info className="h-4 w-4" />,
              className: "!border-blue-200 !bg-blue-50",
            });
          },
        },
      }
    );
  },

  // Toast para creación exitosa
  createSuccess: ({
    description,
    type = "insumo",
    duration = 4000,
  }: ItemToastData) => {
    toast.success(
      `¡${type.charAt(0).toUpperCase() + type.slice(1)} creado exitosamente!`,
      {
        description: (
          <div className="flex items-center gap-2">
            <span className="font-normal text-muted-foreground">
              {description}
            </span>
          </div>
        ),
        duration,
        className: "!bg-gradient-to-r !from-green-50 !to-emerald-100",
        position: "bottom-left",
      }
    );
  },

  // Toast para actualización exitosa
  updateSuccess: ({
    description,
    type = "insumo",
    duration = 4000,
  }: ItemToastData) => {
    toast.success(
      `¡${
        type.charAt(0).toUpperCase() + type.slice(1)
      } actualizado exitosamente!`,
      {
        description: (
          <div className="flex items-center gap-2">
            <span className="font-normal text-muted-foreground">
              {description}
            </span>
          </div>
        ),
        duration,
        className: "!bg-gradient-to-r !from-blue-50 to-cyan-100",
        position: "bottom-left",
      }
    );
  },

  // Toast para errores
  error: ({
    description,
    type = "insumo",
    duration = 6000,
    message,
  }: ItemToastData & { message?: string }) => {
    toast.error(`Error en ${type}`, {
      description: (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-normal text-muted-foreground">
              {description}
            </span>
          </div>
          {message && (
            <div className="text-sm text-red-700 font-medium">{message}</div>
          )}
        </div>
      ),
      duration,
      className: "!bg-gradient-to-r !from-red-100 !to-pink-100",
    });
  },

  // Toast informativo
  info: ({
    description,
    type = "insumo",
    duration = 4000,
    message,
  }: ItemToastData & { message?: string }) => {
    toast.info(`Información del ${type}`, {
      description: (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-normal text-muted-foreground">
              {description}
            </span>
          </div>
          {message && <div className="text-sm text-indigo-700">{message}</div>}
        </div>
      ),
      duration,
      className: "!bg-gradient-to-r !from-indigo-50 !to-purple-100",
    });
  },
};
