import {Injectable, inject} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class SocketService {
	public socket: WebSocket;
	private _isOpen: boolean;
	public router = inject(Router);

	constructor() {
		this._isOpen = false;
		this.socket = new WebSocket("wss://mm-api.dnascanner.de");

		this.initialize();
	}

	private initialize = async () => {
		return await new Promise((resolve) => {
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
				// console.log("Socket message: ", event.data);
			});
		});
	};

	public isOpen = (): boolean => {
		return this._isOpen;
	};

	public waitOpen = async (): Promise<boolean> => {
		return await new Promise<boolean>(async (resolve) => {
			while (!this._isOpen) {
				await new Promise((resolve) => setTimeout(resolve, 10));
			}

			resolve(true);
		});
	};
}
