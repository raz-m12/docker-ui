import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "../../base/dashboard/dashboard.component";
import {BaseModule} from "../../base/base.module";
import {ControllerComponent} from "./controller.component";

const controllerRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: ControllerComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(controllerRoutes),
    BaseModule.forRoot()
  ],
  exports: [RouterModule]
})
export class ControllerRoutingModule {}
