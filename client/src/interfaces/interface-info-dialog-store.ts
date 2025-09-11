type InfoDialogState = {
  infoDialogIsOpen: boolean;
};

type InfoDialogActions = {
  setInfoDialogIsOpen: (open: boolean) => void;
};

export interface InfoDialogStore extends InfoDialogState, InfoDialogActions {}
