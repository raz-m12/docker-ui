import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ContainerService} from "../services/container.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectSelectedGuard implements CanActivate {
  constructor(private CS: ContainerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id: string = route.params["id"];
    const canActivate = this.CS.existsProject(id);
    if(!canActivate)
      this.router.navigate(['/dashboard']);

    return true;
  }
}
