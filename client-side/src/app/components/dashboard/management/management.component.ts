import {Component, OnDestroy} from '@angular/core'
import {type ProjectTableElement} from '../../../base/models/container.interface'
import {ContainerService} from "../../../base/services/container.service"
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {SocketService} from "../../../base/services/socket.service";
import {OperationsService} from "../../../base/services/operations.service";
import {TableDialogComponent} from "../table-dialog/table-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnDestroy {
  // Selected element
  project: ProjectTableElement;

  // Unsubscribe
  private ngUnsubscribe = new Subject<void>();

  constructor(public CS: ContainerService, public router: Router, public socketService: SocketService,
              public CM: OperationsService, private dialog: MatDialog,) {
    this.project = undefined!;
    this.CS.activeProject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(c => {
      this.project = c
    });
  }

  /**
   * Signal that an operation is awaiting completion
   */
  opPending() {
    return this.CS.isOperationPending();
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
    this.router.navigate(["/dashboard/containers"]);
  }

  openDialog(action: string) {
    this.project.action = action;

    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '600px',
      data: this.project
    });
  }
}
