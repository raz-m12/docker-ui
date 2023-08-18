import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BaseModule} from "../../base/base.module";
import {DashboardComponent} from "../../base/dashboard/dashboard.component";

// TODO RV need to add authentication guard
const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
