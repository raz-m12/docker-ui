import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContainerElement} from "../../../base/models/container.interface";

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss']
})
export class TableDialogComponent {
  action?: string;
  model:ContainerElement;
  isModelNameEmpty: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ContainerElement) {
    this.model = {...data};
    this.action = this.model.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.model});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  disableActionBtn() {
    this.isModelNameEmpty = this.model.name.trim().length === 0;
  }
}
