import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {UserRoutingModule} from "./user-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import {BaseModule} from "../../base/base.module";
import {UserService} from "./user.service";


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
    imports: [
      CommonModule,
      UserRoutingModule,
      ReactiveFormsModule,
      BaseModule.forRoot()
    ],
  providers: [UserService]
})
export class UserModule { }
