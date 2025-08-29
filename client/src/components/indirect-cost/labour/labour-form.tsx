"use client"
import { onCreateAction } from "@/components/indirect-cost/labour/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";


interface LabourFormProps {
  onCancel: () => void,
  initialValues?: {
    salary: number | undefined,
    hours: number | undefined,
    date: Date
  },
  isDisabled?: boolean,
  type?: "update" | "create"
}

const LabourForm = ({ type = "create", onCancel, initialValues = { hours: undefined, salary: undefined, date: new Date() }, isDisabled = false }: LabourFormProps) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      if (type === "create") {
        await onCreateAction(new FormData(e.currentTarget));
      }
      setFormData({ hours: undefined, salary: undefined, date: new Date() });
    }} className={
      `flex flex-col gap-5 justify-between p-3 bg-background border rounded-xl ${type === "create" ? "mt-4 " : "bg-muted"}`
    }>
      {type === "create" && <h3 className="text-lg font-medium">Agregar nuevo salario</h3>}
      <div className="flex items-center sm:flex-row flex-col">
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 w-full">

          <label className="w-full text-sm">
            Puesto
            <input type="text" name="position" placeholder="Puesto" className={`${type === "create" ? "outline" : "bg-background"} rounded-lg w-full px-3 py-1.5 my-1 text-base`} value={"Operario"} disabled />
          </label>

          <label className="w-full text-sm">
            Sueldo total
            <input type="number" name="salary" placeholder="Salario al mes" min={1} className={`${type === "create" ? "outline" : "bg-background"} rounded-lg w-full px-3 py-1.5 my-1 text-base`} required onChange={handleChange} value={formData.salary} disabled={isDisabled} />
          </label>
          <label className="w-full text-sm">
            Horas trabajadas
            <input type="number" name="hours" placeholder="Horas al mes" min={1} className={`${type === "create" ? "outline" : "bg-background"} rounded-lg w-full px-3 py-1.5 my-1 text-base`} required onChange={handleChange} value={formData.hours} disabled={isDisabled} />
          </label>

          {
            initialValues &&
            <label className="w-full text-sm">
              Fecha
              <input type="text" name="date" className={`${type === "create" ? "outline" : "bg-background"} rounded-lg w-full px-3 py-1.5 my-1 text-base`} onChange={handleChange}
                value={new Date(formData.date).toLocaleDateString("es-AR", {
                  month: "2-digit",
                  year: "numeric",
                })} disabled />
            </label>
          }
        </div>
        <div className="col-span-2 flex gap-2 w-fit ml-auto">
          <Button type="button" variant={"outline-ghost"} size={"icon"} className="text-primary hover:text-primary cursor-pointer">
            <PencilIcon className="size-5" />
          </Button>
          <Button type="button" variant={"outline-ghost"} size={"icon"} className="text-red-800 hover:text-red-800 cursor-pointer">
            <TrashIcon className="size-5" />
          </Button>
        </div>
      </div>
      {
        type === "create" && !isDisabled && (
          <div className="flex gap-2 justify-end">
            <Button type="submit">Agregar</Button>
            <Button variant="outline" type="reset" onClick={onCancel}>Cancelar</Button>
          </div>
        )
      }
    </form>
  )
}


export default LabourForm;
