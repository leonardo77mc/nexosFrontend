import {Component, Inject, OnInit} from '@angular/core';
import {IDialogAlert, IDialogAlertResult} from "../../core/interfaces/dialog.interface";
import {Store} from "@ngxs/store";
import {DialogAlertEnum} from "../../core/enums/dialog-alert.enum";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  public dataView: IDialogAlert = {} as IDialogAlert;
  public confirButton = true;
  public iconDialog = DialogAlertEnum;
  public viewIcon?: string;
  public colorIcon?: string;
  public dataResult: IDialogAlertResult = {};
  constructor(
    private store: Store,
    public modalDialog: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: IDialogAlert,
  ) {
    this.createDataDialog(_data);
  }

  ngOnInit(): void {
  }

  /**createDataDialog
   * @description carga la iformacion del dialog e icono
   */
  public createDataDialog(data: IDialogAlert): void {
    this.dataView = data;
    switch (data.type) {
      case this.iconDialog.success:
      {this.viewIcon = this.iconDialog.success; this.colorIcon = '#94FA09'; }
        break;
      case this.iconDialog.error:
      {this.viewIcon = this.iconDialog.error; this.colorIcon = '#FA093A'; }
        break;
      case this.iconDialog.warning:
      {this.viewIcon = this.iconDialog.warning; this.colorIcon = '#FC9C03'; }
        break;
      case this.iconDialog.info:
      {this.viewIcon = this.iconDialog.info; this.colorIcon = '#03F7FC'; }
        break;
      case this.iconDialog.question:
      {this.viewIcon = this.iconDialog.question; this.colorIcon = '#03B5FC'; }
        break;
    }
  }
  public closeDialogAlert(result: IDialogAlertResult): void {
    this.modalDialog.close(result);
  }
}
