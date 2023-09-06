import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {UserRoutingModule} from "./user-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import {BaseModule} from "../../base/base.module";
import {UserService} from "../../base/services/services";
import { HomeComponent } from '../dashboard/home/home.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    BaseModule.forRoot(),
    NgOptimizedImage,
    MatCardModule
  ],
  providers: [UserService]
})
export class UserModule { }
