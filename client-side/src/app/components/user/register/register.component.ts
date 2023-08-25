import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../base/services/services";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  form: FormGroup;
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
    this.userService.register(this.form.value).subscribe(
      (data) => {
        this.alertService.success("Registration successful");
        this.router.navigate(["/login"]);
    });
  }
}
