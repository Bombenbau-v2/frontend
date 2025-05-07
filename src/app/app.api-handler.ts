import { LoginResponse } from '../../../backend/types/ws';
import { RegisterResponse } from '../../../backend/types/http';

//await message response
export const waitForMessage = (
  ws: WebSocket,
  concern: string
): Promise<any> => {
  return new Promise((resolve) => {
    const handler = (data: any) => {
      const response = JSON.parse(data.toString());
      if (response.concern === concern) {
        ws.removeEventListener('message', handler);
        resolve(response);
      }
      ws.addEventListener('message', handler);
    };
  });
};

//generate new login connection
export const login = (
  ws: WebSocket,
  tag: string,
  password: string
): Promise<LoginResponse> => {
  const response = waitForMessage(ws, 'login') as Promise<LoginResponse>;
  ws.send(
    JSON.stringify({
      request: '/login',
      data: { tag: tag, password: password },
    })
  );
  return response;
};

export const register = async (
  name: string,
  tag: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await fetch('https://hm-api.dnascanner.de/register', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      tag: tag,
      password: password,
    }),
  });
  return await response.json();
};
