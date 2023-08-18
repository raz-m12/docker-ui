import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {ControllerDetailsComponent} from "./controller-details/controller-details.component";
import {DashboardComponent} from "../../base/dashboard/dashboard.component";
import {BaseModule} from "../../base/base.module";

const controllerRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: ControllerDetailsComponent
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
