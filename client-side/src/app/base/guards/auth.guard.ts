import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService,
              private jwtHelper: JwtHelperService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("currentUser");
      if (token !== null) {
        return !this.jwtHelper.isTokenExpired(token);
      }
    }
    // not logged in so redirect to login page with the return url
    this.toastr.info("Please log in to proceed");
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
