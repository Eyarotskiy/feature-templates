import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { WEBSOCKET_URI } from 'src/app/shared/constants';

@Injectable()
export class WebSocketService {
  socket: any;

  constructor() {
    this.socket = io(WEBSOCKET_URI, {transports: ['websocket']});
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber: any) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any = {}) {
    this.socket.emit(eventName, data);
  }
}
