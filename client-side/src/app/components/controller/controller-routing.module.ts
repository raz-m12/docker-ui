import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "../../base/dashboard/dashboard.component";
import {BaseModule} from "../../base/base.module";
import {ControllerComponent} from "./controller.component";
import {ControlCenterComponent} from "./control-center/control-center.component";

const controllerRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: ControllerComponent
      },
      {
        path: ":id",
        component: ControlCenterComponent
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
