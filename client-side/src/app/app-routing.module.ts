import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./components/user/module/user.module").then((module) => module.UserModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
