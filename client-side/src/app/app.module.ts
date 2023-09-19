import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { BaseModule } from './base/base.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common'
import {JwtModule} from "@auth0/angular-jwt";
import {env} from "../../config/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('currentUser'),
        allowedDomains: [env.serverEndpoint],
      },
    }),
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    BaseModule.forRoot(),
    NgbModule,
    AngularSvgIconModule
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
