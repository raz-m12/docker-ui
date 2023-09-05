import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, type Routes } from '@angular/router'
import {AuthGuard} from "./base/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/dashboard/controller.module').then(module => module.ControllerModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
