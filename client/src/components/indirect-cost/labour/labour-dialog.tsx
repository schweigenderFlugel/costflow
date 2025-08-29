import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "@heroicons/react/24/solid"

const LabourDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Ver mano de obra</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Costos de mano de obra</DialogTitle>
            <div className="flex justify-between items-center w-full">
              <DialogDescription>
                Valor por mes de los roles de trabajo.
              </DialogDescription>
              <Button size={"sm"} className="text-xs">
                <PlusIcon className="w-4 h-4" />
                Agregar mano de obra
              </Button>
            </div>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}


export default LabourDialog;
