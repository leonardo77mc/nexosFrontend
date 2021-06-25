import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {IDialogAlert, IDialogAlertResult} from "../core/interfaces/dialog.interface";
import {DialogAlertComponent} from "./dialog-alert/dialog-alert.component";

@Injectable()
export class Dialogs {

  constructor(
    private matDialog: MatDialog
  ) {}

  /**
   * @description para retornar promise del Dialog
   */
  public showDialogAlertOption(data: IDialogAlert): Promise<IDialogAlertResult> {
    return  this.matDialog.open(DialogAlertComponent, {
      panelClass: 'form-dialog-event',
      data,
      width: '400px',
      disableClose: data.disableClose ? true : false,
    }).afterClosed().toPromise<IDialogAlertResult>();
  }

}
