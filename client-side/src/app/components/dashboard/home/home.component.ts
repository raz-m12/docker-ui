import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToolbarComponent} from "../../../base/toolbar/toolbar.component";
import {ToolbarService} from "../../../base/services/toolbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  breakpoint = 2;
  constructor(private router: Router, private toolbar: ToolbarService) {
  }
  goto(path: [string]) {
    this.router.navigate(path);
  }
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 2;
  }

  onResize(event: UIEvent) {
    const width = (event.target as Window).innerWidth;
    this.breakpoint = width <= 1000 ? 1 : 2;
    if(width < 570)
      this.toolbar.open(false);
  }
}
