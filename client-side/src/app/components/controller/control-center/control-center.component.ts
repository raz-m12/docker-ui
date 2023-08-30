import {Component, OnDestroy} from '@angular/core'
import {type ProjectTableElement} from '../../../base/models/container.interface'
import {ContainerService} from "../../../base/services/container.service"
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {SocketService} from "../../../base/services/socket.service";

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

  constructor(public CS: ContainerService, public router: Router, public socketService: SocketService) {
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
    this.CS.build(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  kill() {
    this.CS.kill(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  start() {
    this.CS.start(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  stop() {
    this.CS.stop(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  restart() {
    this.CS.restart(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  composeUp() {
    this.CS.composeUp(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  composeDown() {
    this.CS.composeDown(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  getLogs() {
    this.CS.getLogs(this.project.id!).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  toggleLogs() {
    this.socketService.toggle();
  }

  goBack(){
    this.router.navigate(["dashboard"]);
  }

}
