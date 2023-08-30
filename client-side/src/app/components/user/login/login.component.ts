import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../base/services/services";
import {first} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  form: FormGroup;
  isRegistering = false;
  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {

    // create form
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }


  public login() {
    // Attempt login
    this.userService.login(this.form.value).pipe(first()).subscribe(
      () => {
        alert("Successful http call... + " + this.form.value.username);
      }
      // TODO RV handle error message
    );
  }
}
