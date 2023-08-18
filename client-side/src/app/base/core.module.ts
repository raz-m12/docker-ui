import { NgModule, ModuleWithProviders } from "@angular/core";
import { ToastrModule, ToastrService } from "ngx-toastr";

@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
    })
  ],
  declarations: [],
  exports: [ToastrModule]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [ToastrService]
    };
  }
}
