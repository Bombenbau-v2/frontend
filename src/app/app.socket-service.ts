import { P } from '@angular/cdk/keycodes';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: WebSocket;
  isOpen: boolean = false;
  router = inject(Router);

  constructor() {
    this.socket = new WebSocket('wss://hm-api.dnascanner.de');

    // (async () => {
    //   while (true) {
    //     await new Promise((resolve) => setTimeout(resolve, 100));
    //     console.log('isOpen?', this.isOpen);
    //   }
    // })();

    // this.initializeSocket();
  }

  public setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
  public isOpenMethod(): boolean {
    this.setIsOpen(true);
    return this.isOpen;
  }

  private async initializeSocket() {
    await new Promise<void>(
      (resolve) => (this.socket.onopen = () => resolve())
    );
    this.isOpen = true;
    this.socket.onmessage = (event: MessageEvent) => {
      if (event.data === 'unauthorized') {
        this.router.navigate(['/login']);
      }
    };
    this.socket.onclose = (event: CloseEvent) => {
      console.log('Socket closed:', event);
    };
    this.socket.onerror = (event: Event) => {
      console.error('Socket error:', event);
    };
  }
}
