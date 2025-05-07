import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SocketService {
  public socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('wss://hm-api.dnascanner.de')
  }
}