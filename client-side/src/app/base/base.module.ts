import { NgModule, ModuleWithProviders } from "@angular/core";
import { ToastrModule, ToastrService } from "ngx-toastr";
import {DashboardModule} from "./dashboard/dashboard.module";

@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
    }),
    DashboardModule
  ],
  declarations: [ ],
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
