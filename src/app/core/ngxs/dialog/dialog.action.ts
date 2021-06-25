import {IDialogAlert} from "../../interfaces/dialog.interface";

export namespace AlertDialog {
  export class Open {
    static readonly type = '[AlertDialog] Open';
    constructor(public payload: IDialogAlert) {}
  }
}
