import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {LoginToken, User} from "../models/user.interface";
import {env} from "../../../../environments/environment";
import {Router} from "@angular/router";



@Injectable()
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Attempts to log in given a user
   * @param user specified user
   */
  public login(user: User) {
    console.log(user);
    return this.http.post<LoginToken>(env.serverEndpoint + "user/authenticate", {
      username: user.username,
      password: user.password
    }).pipe(map((result) => {
      if (result && result.token) {
        localStorage.setItem("currentUser", JSON.stringify(result.token));
      }

      return user;
    }));
  }

  /**
   * Attempts to register an account
   * @param user given user
   */
  register(user: User) {
    return this.http.post<User>(env.serverEndpoint + "user/register", user);
  }

  /**
   * Logout from current active account
   */
  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }
}
