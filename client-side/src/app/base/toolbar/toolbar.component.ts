import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {ToolbarService} from "../services/toolbar.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  @Input() snav: MatSidenav | undefined;

  constructor(private toolbar: ToolbarService) {
    this.toolbar.openToolbar().subscribe((open) => {
      if(open)
        this.snav?.open();
      else
        this.snav?.close();
    });
  }
  toggle() {
    this.snav?.toggle();
  }

  ngOnInit(): void {
    this.toolbar.open(false);
    if(localStorage.getItem("currentUser") !== null) {
      this.snav?.toggle();
    }
  }
}
