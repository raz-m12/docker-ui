import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../base/services/services";
import {first} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  form: FormGroup;
  get passwordInput() { return this.form.get('password'); }
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: ToastrService) {

    // create form
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }
  public register() {
    this.userService.register(this.form.value).pipe(first()).subscribe(
      {
        next: () => {
          this.alertService.success("Registration successful");
          this.router.navigate(["/login"]);
        },
        error: (err) => {
            this.alertService.error(err.error.message);
        }
    });
  }
}
