import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {User} from "../models/user.interface";
import {environment} from "../../../../environments/envinronment";


@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  // TODO manage users
  public login(user: User) {
    return this.http.post(environment.serverEndpoint + "user/authenticate", {
      username: "bob",
      password: "martin"
    }).pipe(map(() => {
      console.log("works");
    }));
  }

  register(user: User) {
    return this.http.post<User>(environment.serverEndpoint + "user/register", user);
  }
}
