import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../login/login.service";
import {UserRoutingModule} from "./user-routing.module";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [LoginService]
})
export class UserModule { }
