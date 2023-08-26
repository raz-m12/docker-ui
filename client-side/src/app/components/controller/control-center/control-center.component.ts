import {Component} from '@angular/core';
import {ContainerTableElement} from "../../../base/models/container.interface";
import {ContainerService} from "../../../base/services/container.service";

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.scss']
})
export class ControlCenterComponent {
  container: ContainerTableElement | undefined;

  constructor(public CS: ContainerService) {
    this.CS.activeContainer().subscribe(c => {
      this.container = c
    });
  }

  build() {

  }

  stop() {

  }

  start() {

  }

  restart() {

  }

  delete() {

  }

  logs() {

  }
}
