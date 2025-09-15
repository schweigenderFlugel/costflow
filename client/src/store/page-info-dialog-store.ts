import { InfoDialogStore } from "@/interfaces/interface-info-dialog-store";
import { create } from "zustand";

const usePageInfoDialogStore = create<InfoDialogStore>()((set) => ({
  // state
  infoDialogIsOpen: false,

  // set
  setInfoDialogIsOpen: (open) => set({ infoDialogIsOpen: open }),
}));

export default usePageInfoDialogStore;
