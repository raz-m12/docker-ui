import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
// TODO relazione
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("currentUser")) {
        // logged in so return true
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.toastr.info("Please log in to proceed");
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
