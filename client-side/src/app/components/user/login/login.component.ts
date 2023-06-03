import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isRegistering: boolean = false;
  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder) {

    // create form
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public attemptLogin() {
    const user = new User(
      this.form.controls['username'].value,
      this.form.controls['password'].value
    );

    // Attempt login
    return this.loginService.login(user).subscribe(
      response => {
        alert("Successful http call... + " + user.username);
      }
      // TODO RV handle error message
    );
  }
}
