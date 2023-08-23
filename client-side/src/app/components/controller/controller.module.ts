import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from "../../base/base.module";
import { ControllerRoutingModule } from "./controller-routing.module";
import { LoggerComponent } from './logger/logger.component';
import { ControllerComponent } from './controller.component';
import { TableComponent } from './table/table.component';
import { ControlCenterComponent } from './control-center/control-center.component';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    LoggerComponent,
    ControllerComponent,
    TableComponent,
    ControlCenterComponent,
    TableDialogComponent
  ],
  imports: [
    CommonModule,
    ControllerRoutingModule,
    BaseModule.forRoot(),
    FormsModule
  ]
})
export class ControllerModule { }
