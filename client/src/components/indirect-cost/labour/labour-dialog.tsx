"use client"
import LabourForm from "@/components/indirect-cost/labour/labour-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { fetcher } from "@/utils/fetcher"
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import { Suspense, useEffect, useState } from "react"

const LabourDialog = () => {
  const [addLabour, setAddLabour] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [labour, setLabour] = useState([]);

  useEffect(() => {
    const fetchLabour = async () => {
      setIsLoading(true);
      const data = await fetcher({ input: `/api/labour` });
      setLabour(data);
      setIsLoading(false);
    };

    fetchLabour();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="sm:inline hidden">Ver {" "}</span>
          Mano de Obra</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Costos de mano de obra</DialogTitle>
          <div className="flex justify-between sm:flex-row flex-col items-start gap-2 sm:items-center w-full">
            <DialogDescription>
              Valor por mes de los roles de trabajo.
            </DialogDescription>
            <Button size={"sm"} className="text-xs ml-auto" variant={"not-default"} onClick={() => setAddLabour(!addLabour)}>
              {!addLabour ? <PlusIcon className="w-4 h-4" /> : <MinusIcon className="w-4 h-4" />}
              {!addLabour ? "Agregar mano de obra" : "No agregar mano de obra"}
            </Button>
          </div>
        </DialogHeader>
        <Suspense>
          {
            (isLoading && !labour.length) ? "Cargando..." : (
              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                {labour?.map((item: { id: string, salary: number, hours: number, date: Date }) => {
                  return (
                    <LabourForm onCancel={() => { }} initialValues={item} key={item.id} isDisabled type="update" />
                  )
                })}
              </div>
            )
          }

          <DialogFooter>
            {
              addLabour && <LabourForm onCancel={() => setAddLabour(false)} />
            }
          </DialogFooter>
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}


export default LabourDialog;
