import {Component, ViewEncapsulation} from '@angular/core';
import {User} from "../user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  form: FormGroup;
  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder) {

    // create form
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required]
    });
  }
  public register() {
    alert("Test");
  }
}
