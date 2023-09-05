import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from "../../base/base.module";
import { ControllerRoutingModule } from "./controller-routing.module";
import { LoggerComponent } from './logger/logger.component';
import { TableComponent } from './table/table.component';
import { ManagementComponent } from './management/management.component';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoggerComponent,
    TableComponent,
    ManagementComponent,
    TableDialogComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ControllerRoutingModule,
        BaseModule.forRoot(),
        FormsModule
    ],
  providers: [ ]
})
export class ControllerModule { }
