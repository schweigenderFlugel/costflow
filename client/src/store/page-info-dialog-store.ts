import { create } from "zustand"

type InfoDialogState = {
  infoDialogIsOpen: boolean
}

type InfoDialogActions = {
  setInfoDialogIsOpen: (open: boolean) => void;
}

interface InfoDialogStore extends InfoDialogState, InfoDialogActions { }

const usePageInfoDialogStore = create<InfoDialogStore>()(
  (set) => ({

    // state
    infoDialogIsOpen: false,

    // set
    setInfoDialogIsOpen: (open) => set({ infoDialogIsOpen: open }),
  })
)

export default usePageInfoDialogStore;
