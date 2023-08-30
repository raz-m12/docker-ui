import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {SocketService} from "../../../base/services/socket.service";
import {MESSAGES} from "../../../base/models/sockerio.interface";

@Component({
  selector: 'app-log-area',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggerComponent implements OnDestroy{
  // Unsubscribe
  private ngUnsubscribe = new Subject<void>();
  logger: MyLogger = new MyLogger();

  constructor(public socketService: SocketService, cdRef: ChangeDetectorRef) {
    // Listen to reply logs
    this.socketService.onEvent(MESSAGES.REPLY_LOG).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      console.log('New message received:', data);
      this.logger.append(data);
      cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

class MyLogger {
  data = '';

  append(newData: string) {
    this.data = this.data + newData;
  }

}
