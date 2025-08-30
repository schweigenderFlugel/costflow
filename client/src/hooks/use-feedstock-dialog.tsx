import useDialogStore from '@/store/feedstock-dialog-store'
import { useShallow } from 'zustand/react/shallow'

export const useCreateFeedstockDialog = () => {
  const { isOpen, setIsOpen } = useDialogStore(
    useShallow(state => ({
      isOpen: state.createFeedstockDialog,
      setIsOpen: state.setCreateFeedstockDialog,
    })))

  return {
    isOpen,
    setIsOpen,
    close: () => setIsOpen(false)
  }
}


// export const useDetailDialog = () => {
//   const { isOpen, setIsOpen, feedstock, setFeedstock } = useDialogStore(useShallow((state) => ({
//     isOpen: state.detailFeedstockDialog,
//     setIsOpen: state.setDetailFeedstockDialog,
//     feedstock: state.feedstock,
//     setFeedstock: state.setFeedstock

//   })))

//   return {
//     isOpen,
//     setIsOpen,
//     feedstock,
//     setFeedstock
//   }
// }


export const useUpdateFeedstockDialog = () => {
  const { isOpen, setIsOpen, feedstock, setFeedstock } = useDialogStore(useShallow((state) => ({
    isOpen: state.updateFeedstockDialog,
    setIsOpen: state.setUpdateFeedstockDialog,
    feedstock: state.feedstock,
    setFeedstock: state.setFeedstock
  })))

  return {
    isOpen,
    setIsOpen,
    feedstock,
    setFeedstock,
  }
}


export const useDeleteFeedstockDialog = () => {
  const { isOpen, setIsOpen, feedstock, setFeedstock } = useDialogStore(useShallow((state) => ({
    isOpen: state.deleteFeedstockDialog,
    setIsOpen: state.setDeleteFeedstockDialog,
    feedstock: state.feedstock,
    setFeedstock: state.setFeedstock
  })))

  return {
    isOpen,
    setIsOpen,
    feedstock,
    setFeedstock,
  }
}

