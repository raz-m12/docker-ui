import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControllerDetailsComponent } from './controller-details/controller-details.component';
import { BaseModule } from "../../base/base.module";
import { ControllerRoutingModule } from "./controller-routing.module";

@NgModule({
  declarations: [
    ControllerDetailsComponent
  ],
  imports: [
    CommonModule,
    ControllerRoutingModule,
    BaseModule.forRoot()
  ]
})
export class ControllerModule { }
