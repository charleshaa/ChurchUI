import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'ws';

const SERVER_URL = 'ws://localhost:8080';

@Injectable()
export class SocketService {

  private socket: WebSocket;

  private events = {
    onopen: () => {
        
    },
    onclose: () => {
        
    }
  };

  private setupEvents(events: any, ws: WebSocket): void {
    for (var key in events) {
        if (events.hasOwnProperty(key)) {
            ws[key] = events[key];
        }
    }
  }

  public initSocket(): void {
      this.socket = new WebSocket(SERVER_URL);
      this.setupEvents(this.events, this.socket);
  }

  public send(message: string): void {
      this.socket.send(message);
  }

  public onMessage(): Observable<Message> {
      return new Observable<Message>(observer => {
          this.socket.onmessage = (data: MessageEvent) => observer.next(data);
      });
  }
}

export class Message {
  constructor(date: Date, content: string) {}
}