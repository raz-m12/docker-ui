import { NgModule, ModuleWithProviders } from "@angular/core";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthGuard} from "./guards/auth.guard";
import {UserService} from "./services/user.service";

@NgModule({
  imports: [
    DashboardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgForOf,
    NgbToast,
    NgIf,
    NgTemplateOutlet
  ],
  declarations: [
  ],
  exports: [
    DashboardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [AuthGuard, UserService]
    };
  }
}
