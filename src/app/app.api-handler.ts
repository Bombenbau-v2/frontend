import {LoginResponse, type LoginRequest, type SocketRequest} from "../../../backend/types/ws";
import {RegisterResponse} from "../../../backend/types/http";

//await message response
export const waitForMessage = async (ws: WebSocket, concern: string): Promise<any> => {
	// return await new Promise((resolve) => {
	// 	const handler = (data: any) => {
	// 		const response = JSON.parse(data.toString());
	//     console.log("waitForMessage", response);
	// 		if (response.concern === concern) {
	// 			ws.removeEventListener("message", handler);
	// 			resolve(response);
	// 		}
	// 		ws.addEventListener("message", handler);
	// 	};
	// });

	return await new Promise((resolve) => {
		const handler = (data: any) => {
			const response = JSON.parse(data.data);

      if (response.concern === concern) {
        console.log(response)
      }
		};

		ws.addEventListener("message", handler);
	});
};

//generate new login connection
export const login = (ws: WebSocket, tag: string, password: string): Promise<LoginResponse> => {
	// Set up response handler
	const response = waitForMessage(ws, "login") as Promise<LoginResponse>;

	// Send request
	const request: LoginRequest = {
		tag,
		password,
	};

	ws.send(
		JSON.stringify({
			request: "/login",
			data: request,
		} as SocketRequest)
	);

	// Return response promise
	return response;
};

export const register = async (name: string, tag: string, password: string): Promise<RegisterResponse> => {
	const response = await fetch("https://mm-api.dnascanner.de/register", {
		method: "POST",
		body: JSON.stringify({
			name: name,
			tag: tag,
			password: password,
		}),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	return await response.json();
};
