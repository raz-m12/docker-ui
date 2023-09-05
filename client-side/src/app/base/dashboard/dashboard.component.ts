import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

/** @title Responsive sidenav */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  onLogout() {
    this.userService.logout();
  }

  goto(path: string[]) {
    this.router.navigate(path);
  }
}
