import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "../../base/dashboard/dashboard.component";
import {BaseModule} from "../../base/base.module";
import {ControlCenterComponent} from "./control-center/control-center.component";
import {TableComponent} from "./table/table.component";
import {ProjectSelectedGuard} from "../../base/guards/project-selected.guard";

const controllerRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: TableComponent
      },
      {
        path: ":id",
        component: ControlCenterComponent,
        canActivate: [ProjectSelectedGuard]
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
