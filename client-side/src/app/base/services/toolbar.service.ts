import { Injectable } from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private _open: Subject<boolean> = new Subject<boolean>();

  openToolbar() {
    return this._open;
  }
  open(value: boolean) {
    this._open.next(value);
  }
}
