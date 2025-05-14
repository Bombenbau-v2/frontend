import { GetConversationRequest, GetConversationResponse, ListConversationsRequest, ListConversationsResponse, LoginResponse, SendMessageRequest, SendMessageResponse, type LoginRequest, type SocketRequest, type UserExistByTagRequest, type UserExistByTagResponse } from "../../../backend/types/ws";
import { RegisterResponse } from "../../../backend/types/http";
import { UserTag } from "../../../backend/types/misc";

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

//Returns if a user exists by their usertag
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
    )

  // Return response promise
  return response;
};
//Returns a list of conversations user is active in
export const listConversations = async (ws: WebSocket): Promise<ListConversationsResponse> => {
  //Set up response handler
  const response = waitForMessage(ws, "list_conversations") as Promise<ListConversationsResponse>;
  //Request
  const request: ListConversationsRequest = {};
  ws.send(
    JSON.stringify({
      request: "/list_conversations",
      data: request,
    })
  );
  return response;
};

export const sendMessageRequest = async (ws: WebSocket, text: string, recipient: UserTag): Promise<SendMessageResponse> => {
  const uuid = crypto.randomUUID();
  //Set up response handler
  const response = waitForMessage(ws, "send_message+" + uuid) as Promise<SendMessageResponse>;
  //set up request
  const request: SendMessageRequest = {
    text: text,
    uuid: uuid,
    recipient: recipient,
  };
  //send request
  ws.send(
    JSON.stringify({
      request: "/send_message",
      data: request,
    })
  );
  return response;
};

export const getConversationRequest = async (ws: WebSocket, name:string): Promise<GetConversationResponse> => {
	//Wait for response
	const response = waitForMessage(ws, "get_conversation") as Promise<GetConversationResponse>;
	//set up request
	const request: GetConversationRequest = {
		recipient: name
	};
	ws.send(
		JSON.stringify({
			request: "/get_conversation",
			data: request
		})
	)
	return response;
}

export const register = async (name: string, tag: string, password: string): Promise<RegisterResponse> => {
  const response = await fetch("http://localhost:6969/register", {
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
