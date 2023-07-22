export interface ServerToClientEvents {
    message: (payload: MessagePayload) => void;
    roomUsers: (payload: RoomUsersPayload) => void;
  }
  
export interface ClientToServerEvents {
    join: (name: string, room: string, cb: (error: string) => void) => void
    sendMessage: (payload: MessagePayload, cb: () => void) => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}

export interface User {
    socketId: string,
    name: string,
    room: string
}

export interface MessagePayload {
    user: string;
    text: string
}

export interface RoomUsersPayload {
    room: string
    users: string[]
}