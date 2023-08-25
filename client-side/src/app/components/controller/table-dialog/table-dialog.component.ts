import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContainerTableElement} from "../../../base/models/container.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss']
})
export class TableDialogComponent {
  action?: string;
  model:ContainerTableElement;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ContainerTableElement,

    public formBuilder: FormBuilder) {

    this.model = {...data};
    this.action = data.action;
    this.form = this.formBuilder.group({
      name: [data.name, Validators.required],
      yaml: [data.yaml, Validators.required]
    });

    // disable the name field in case of updating
    if(data.action === "Update")
      this.form.get('name')?.disable();
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.form.value});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  disableNameTextbox() {
    return this.form.value.name.trim().length === 0;
  }

}
