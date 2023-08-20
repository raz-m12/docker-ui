import { NgModule, ModuleWithProviders } from "@angular/core";
import { ToastrModule, ToastrService } from "ngx-toastr";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
    }),
    DashboardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [
  ],
  exports: [
    ToastrModule,
    DashboardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [ToastrService]
    };
  }
}
