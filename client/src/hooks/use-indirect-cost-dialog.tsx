import useIndirectCostDialogStore from '@/store/indirect-cost-dialog-store'
import { useShallow } from 'zustand/react/shallow'

export const useCreateIndirectCostDialog = () => {
  const { isOpen, setIsOpen } = useIndirectCostDialogStore(
    useShallow(state => ({
      isOpen: state.createIndirectCostDialog,
      setIsOpen: state.setCreateIndirectCostDialog
    }))
  )
  return {
    isOpen,
    setIsOpen,
  }
}


export const useUpdateIndirectCostDialog = () => {
  const { isOpen, setIsOpen, indirectCost, setIndirectCost,
    // isLoadingIndirectCost, setIsLoadingIndirectCost
  } = useIndirectCostDialogStore(useShallow((state) => ({
    isOpen: state.updateIndirectCostDialog,
    setIsOpen: state.setUpdateIndirectCostDialog,
    indirectCost: state.indirectCost,
    setIndirectCost: state.setIndirectCost,
    // isLoadingIndirectCost: state.isLoadingIndirectCost,
    // setIsLoadingIndirectCost: state.setIsLoadingIndirectCost
  })))

  return {
    isOpen,
    setIsOpen,
    indirectCost,
    setIndirectCost,
    // isLoadingIndirectCost,
    // setIsLoadingIndirectCost,
  }
}


export const useDeleteIndirectCostDialog = () => {
  const { isOpen, setIsOpen, indirectCost, setIndirectCost } = useIndirectCostDialogStore(useShallow((state) => ({
    isOpen: state.deleteIndirectCostDialog,
    setIsOpen: state.setDeleteIndirectCostDialog,
    indirectCost: state.indirectCost,
    setIndirectCost: state.setIndirectCost
  })))

  return {
    isOpen,
    setIsOpen,
    indirectCost,
    setIndirectCost,
  }
}

