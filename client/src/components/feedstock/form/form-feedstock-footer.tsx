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
    <div className="flex flex-col gap-6 w-full mt-auto">
      {errorMessage && (
        <p className="text-md font-medium text-red-500 break-words">{errorMessage}</p>
      )}

      <div className="grid grid-cols-2 gap-4 w-full">
        <Button type="button" disabled={isPending} variant={"outline"} onClick={onClose} className="rounded-xs cursor-pointer min-w-0">
          Cancelar
        </Button>

        <Button type="submit" form={formId} disabled={isPending} className="rounded-xs cursor-pointer min-w-0">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : ""}
          {isPending ? submitingLabel : submitLabel}
        </Button>
      </div>
    </div>
  )
}

export default FormFeedstockFooter;
