export interface IDialogAlert {
  action?: string;
  title?: string;
  text?: string;
  html?: string;
  type?: string;
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  showConfirButton?: boolean;
  showOtherButton?: boolean;
  disableClose?: boolean;
  closeOnNavigation?: boolean;
  textCancelButton?: string;
  textConfirButton?: string;
  textOtherButton?: string;
}

export interface IDialogAlertResult {
  value?: boolean;
  cancel?: boolean;
  other?: boolean;
}
