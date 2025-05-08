import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { login } from "./app.api-handler";
import shajs from "sha.js";
import { waitForMessage } from "./app.api-handler";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  public socket: WebSocket;
  private _isOpen: boolean;
  public router = inject(Router);
  private _userTag: string = "";

  constructor() {
    this._isOpen = false;
    this.socket = new WebSocket("ws://localhost:6969/");

    this.initialize();
  }

  private initialize = async () => {
    return await new Promise(async (resolve) => {
      this.socket.addEventListener("open", () => {
        this._isOpen = true;
        resolve(true);
      });

      this.socket.addEventListener("close", (event) => {
        console.log("Socket closed: ", event);
      });

      this.socket.addEventListener("error", (event) => {
        console.log("Socket error: ", event);
      });

      this.socket.addEventListener("message", (event) => {
        if (event.data === "unauthorized") {
          console.log("Unauthorized, redirecting to login page");
          this.router.navigate(["/login","unauthorized"]);
        }

        // console.log("Socket message: ", event.data);
      });
    });
  };

  public isOpen = (): boolean => {
    return this._isOpen;
  };

  public setUserTag = (tag: string): void => {
    this._userTag = tag;
  }

  public getUserTag = (): string => {
    return this._userTag;
  }

  
  public waitOpen = async (): Promise<boolean> => {
    return await new Promise<boolean>(async (resolve) => {
      while (!this._isOpen) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      resolve(true);
    });
  };
}
