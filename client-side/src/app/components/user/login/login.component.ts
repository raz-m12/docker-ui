import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../base/services/services";
import {first} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  returnUrl = "/";

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router) {

    this.userService.logout();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Final URL:', event.url);
        console.log('Query Params:', this.router.routerState.snapshot.root.queryParams);
      }
    });

    // create form
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }


  /**
   * Runs when the login button is pressed
   */
  public login() {
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || "/";
    // Attempt login
    this.userService.login(this.form.value).pipe(first()).subscribe(
      {
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.toastrService.error(error);
        }
      }
    );
  }
}
