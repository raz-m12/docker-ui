import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {User} from "../models/user.interface";
import {env} from "../../../../environments/environment";



@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  // TODO manage users
  public login(user: User) {
    console.log(user);
    return this.http.post(env.serverEndpoint + "user/authenticate", {
      username: "bob",
      password: "martin"
    }).pipe(map(() => {
      console.log("works");
    }));
  }

  register(user: User) {
    return this.http.post<User>(env.serverEndpoint + "user/register", user);
  }
}
