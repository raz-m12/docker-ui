import {Injectable, OnDestroy} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { Observable } from 'rxjs';
import {env} from "../../../../environments/environment";
import {SocketIODTO} from "../models/sockerio.interface";

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private socket: Socket;
  private textDecoder = new TextDecoder();

  constructor() {
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
    this.connected()? this.disconnect(): this.connect();
  }
  connected() {
    return this.socket.connected;
  }

  // Emit an event to the server
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen to events from the server
  onEvent(eventName: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(eventName, (data: SocketIODTO) => {
        observer.next(this.textDecoder.decode(data.buffer));
      });
    });
  }
}
