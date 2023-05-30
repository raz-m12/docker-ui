import { Component } from '@angular/core';
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService) { }

  public login() {
    return this.loginService.login().subscribe(
      response => {
        alert("Successful http call...");
      }
      // TODO RV handle error message
    );
  }
}
