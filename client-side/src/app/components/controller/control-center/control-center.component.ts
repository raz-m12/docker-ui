import {Component, OnDestroy} from '@angular/core'
import {type ProjectTableElement} from '../../../base/models/container.interface'
import {ContainerService} from "../../../base/services/container.service"
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {SocketService} from "../../../base/services/socket.service";
import {ContainerManagementService} from "../../../base/services/container-management.service";

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.scss']
})
export class ControlCenterComponent implements OnDestroy {
  // Selected element
  project: ProjectTableElement;

  // Unsubscribe
  private ngUnsubscribe = new Subject<void>();

  constructor(public CS: ContainerService, public router: Router, public socketService: SocketService, public CM: ContainerManagementService) {
    this.project = undefined!;
    this.CS.activeProject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(c => {
      this.project = c
    });
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  build() {
    this.CM.build(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  kill() {
    this.CM.kill(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  stop() {
    this.CM.stop(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  restart() {
    this.CM.restart(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  composeUp() {
    this.CM.composeUp(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  composeDown() {
    this.CM.composeDown(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  getLogs() {
    this.CM.getLogs(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  toggleLogs() {
    this.socketService.toggle();
  }

  goBack(){
    this.router.navigate(["dashboard"]);
  }

}
