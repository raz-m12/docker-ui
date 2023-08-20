import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from "../../base/base.module";
import { ControllerRoutingModule } from "./controller-routing.module";
import { LoggerComponent } from './logger/logger.component';
import { ControllerComponent } from './controller.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    LoggerComponent,
    ControllerComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    ControllerRoutingModule,
    BaseModule.forRoot()
  ]
})
export class ControllerModule { }
