import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from "../../base/base.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { LoggerComponent } from './logger/logger.component';
import { TableComponent } from './table/table.component';
import { ManagementComponent } from './management/management.component';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";

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
        DashboardRoutingModule,
        BaseModule.forRoot(),
        FormsModule,
        MatTooltipModule
    ],
  providers: [ ]
})
export class DashboardModule { }
