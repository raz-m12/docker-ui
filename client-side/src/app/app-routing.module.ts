import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, type Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    loadChildren: () => import('./components/controller/controller.module').then(module => module.ControllerModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
