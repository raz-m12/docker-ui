import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/envinronment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  public login() {
    return this.http.post(environment.serverEndpoint + "user/authenticate", {
      username: "bob",
      password: "martin"
    }).pipe(map(() => {
      console.log("works");
    }));
  }
}
