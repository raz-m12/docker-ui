import { Component } from '@angular/core'
import {type ProjectTableElement} from '../../../base/models/container.interface'
import {ContainerService} from "../../../base/services/container.service"

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.scss']
})
export class ControlCenterComponent {
  project: ProjectTableElement;

  constructor(public CS: ContainerService) {
    this.project = undefined!;
    this.CS.activeContainer().subscribe(c => {
      this.project = c
    });
  }

  build() {
    this.CS.build(this.project.id!).subscribe();
  }

  create() {
    this.CS.create(this.project.id!).subscribe();
  }

  start() {
    this.CS.start(this.project.id!).subscribe();
  }

  stop() {
    this.CS.stop(this.project.id!).subscribe();
  }

  restart() {
    this.CS.restart(this.project.id!).subscribe();
  }

  composeUp() {
    this.CS.composeUp(this.project.id!).subscribe();
  }

  composeDown() {
    this.CS.composeDown(this.project.id!).subscribe();
  }

  delete() {
    this.CS.delete(this.project.id!).subscribe();
  }

  logs() {
    this.CS.getLogs(this.project.id!).subscribe();
  }
}
