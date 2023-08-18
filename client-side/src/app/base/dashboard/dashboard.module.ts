import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import {RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterOutlet
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
