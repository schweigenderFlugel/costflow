import usePageInfoDialogStore from "@/store/page-info-dialog-store"
import { useShallow } from "zustand/react/shallow"


export const usePageInfoDialog = () => {
  const { isOpen, setIsOpen } = usePageInfoDialogStore(useShallow((state) => ({
    isOpen: state.infoDialogIsOpen,
    setIsOpen: state.setInfoDialogIsOpen,
  })))

  return {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    isOpen,
    setIsOpen
  }
}

