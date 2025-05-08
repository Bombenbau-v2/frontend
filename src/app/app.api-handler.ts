import {LoginResponse, type LoginRequest, type SocketRequest, type UserExistByTagRequest, type UserExistByTagResponse} from "../../../backend/types/ws";
import {RegisterResponse} from "../../../backend/types/http";

//await message response
export const waitForMessage = async (ws: WebSocket, concern: string): Promise<any> => {
	return await new Promise((resolve) => {
		const handler = (data: any) => {
			const response = JSON.parse(data.data);

			if (response.concern === concern) {
				ws.removeEventListener("message", handler);
				resolve(response);
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

export const userExistByTag = async (ws: WebSocket, tag: string): Promise<UserExistByTagResponse> => {
	// Set up response handler
	const response = waitForMessage(ws, "user_exist_by_tag") as Promise<UserExistByTagResponse>;

	// Send request
	const request: UserExistByTagRequest = {
		tag: tag,
	};

	ws.send(
		JSON.stringify({
			request: "/user_exist_by_tag",
			data: request,
		} as SocketRequest)
	);

	// Return response promise
	return response;
};

export const register = async (name: string, tag: string, password: string): Promise<RegisterResponse> => {
	const response = await fetch("https://hm-api.dnascanner.de/register", {
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
