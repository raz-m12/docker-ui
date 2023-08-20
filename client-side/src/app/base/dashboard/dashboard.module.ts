import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ToolbarComponent} from "../toolbar/toolbar.component";



@NgModule({
  declarations: [DashboardComponent, ToolbarComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    NgOptimizedImage
  ],
  exports: [DashboardComponent, ToolbarComponent],

})
export class DashboardModule { }
