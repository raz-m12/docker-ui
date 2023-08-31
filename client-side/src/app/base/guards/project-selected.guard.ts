import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ContainerService} from "../services/container.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectSelectedGuard implements CanActivate {
  constructor(private CS: ContainerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check data at the client first
    const id: string = route.params["id"];
    const canActivate = this.CS.existsProject(id);

    if(canActivate)
      return true;

    // Check in the server
    return this.CS.httpProjectExists(id).then((found) => {
      if (!found) {
        this.router.navigate(['/dashboard']); // Allow navigation
      }
      return found;
    });
  }
}
