import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectTableElement} from "../../../base/models/container.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss']
})
export class TableDialogComponent {
  action?: string;
  model:ProjectTableElement;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProjectTableElement,
    public toast: ToastrService,
    public formBuilder: FormBuilder) {

    this.model = {...data};
    this.action = data.action;
    this.form = this.formBuilder.group({
      name: [data.name, Validators.required],
      yaml: new FormControl({ value: data.yaml, disabled: true}, [Validators.required])
    });

    // disable the name field in case of updating
    if(data.action === "Update")
      this.form.get('name')?.disable();
  }

  doAction(){
    this.toast.success("Saved successfully");
    this.dialogRef.close({event:this.action,data:this.form.value});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  disableNameTextbox() {
    return this.form.value.name.trim().length === 0;
  }

}
