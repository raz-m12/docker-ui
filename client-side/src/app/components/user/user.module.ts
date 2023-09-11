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
import { DocsComponent } from './docs/docs.component';
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent, DocsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    BaseModule.forRoot(),
    NgOptimizedImage,
    MatCardModule,
    MatGridListModule
  ],
  providers: [UserService]
})
export class UserModule { }
