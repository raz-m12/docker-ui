import {Injectable, OnDestroy} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';
import {env} from "../../../../config/environment";
import {SocketIODTO} from "../models/sockerio.interface";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private socket: Socket;

  constructor(public toastr: ToastrService) {
    this.socket = io(env.serverEndpoint);
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  private connect() {
    this.socket.connect();
  }
  private disconnect() {
    this.socket.disconnect();
  }

  toggle() {
    if(this.connected()) {
      this.disconnect();
      this.toastr.success("Logger output is disabled");
    } else {
      this.connect();
      this.toastr.success("Logger output is enabled");
    }
  }
  connected() {
    return this.socket.connected;
  }

  // Emit an event to the server
  emitEvent(eventName: string, data: never): void {
    this.socket.emit(eventName, data);
  }

  // Listen to events from the server
  onEvent(eventName: string): Observable<string> {
    return new Observable(observer => {
      this.socket.on(eventName, (data: SocketIODTO) => {
        console.log(data);
        //observer.next(this.textDecoder.decode(data.buffer));
        observer.next(data.buffer);
      });
    });
  }
}
