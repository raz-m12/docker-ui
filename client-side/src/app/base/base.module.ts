import { NgModule, ModuleWithProviders } from "@angular/core";
import { ToastrModule, ToastrService } from "ngx-toastr";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";

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
  exports: [ToastrModule, DashboardModule]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [ToastrService]
    };
  }
}
