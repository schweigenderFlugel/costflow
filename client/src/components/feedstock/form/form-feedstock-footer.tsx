import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormFeedstockFooterProps {
  errorMessage?: string
  isPending: boolean
  submitLabel: string
  submitingLabel: string
  formId: string;
  onClose: () => void;
}


const FormFeedstockFooter = ({ errorMessage, isPending, submitLabel, submitingLabel, formId, onClose }: FormFeedstockFooterProps) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {errorMessage && (
        <p className="text-md font-medium text-red-500">{errorMessage}</p>
      )}

      <div className="grid grid-cols-2 gap-4 w-full justify-between items-center">
        <Button type="button" disabled={isPending} variant={"outline"} onClick={onClose} className="rounded-xs cursor-pointer">
          Cancelar
        </Button>

        <Button type="submit" form={formId} disabled={isPending} className="rounded-xs cursor-pointer">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : ""}
          {isPending ? submitingLabel : submitLabel}
        </Button>
      </div>
    </div>
  )
}

export default FormFeedstockFooter;
