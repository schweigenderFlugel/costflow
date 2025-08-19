import { Loader2 } from "lucide-react"


const SpinLoader = ({ isPending }: { isPending: boolean }) => {
  if (!isPending) return null
  return <Loader2 className="h-4 w-4 animate-spin" />

}

export default SpinLoader
