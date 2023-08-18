import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isRegistering: boolean = false;
  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {

    // create form
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public login() {
    // Attempt login
    return this.userService.login(this.form.value).subscribe(
      response => {
        alert("Successful http call... + " + this.form.value.username);
      }
      // TODO RV handle error message
    );
  }
}
