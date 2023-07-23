export interface ServerToClientEvents {
    message: (payload: MessagePayload) => void;
    privateMessage: (payload: PrivateMessagePayload) => void;
    roomUsers: (payload: RoomUsersPayload) => void;
  }
  
export interface ClientToServerEvents {
    join: (name: string, room: string, cb: (error: string) => void) => void;
    sendMessage: (payload: MessagePayload, cb: () => void) => void;
    sendPrivateMessage: (payload: PrivateMessagePayload, cb: () => void) => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}

export interface MessagePayload {
    user: string;
    text: string;
}

export interface PrivateMessagePayload extends MessagePayload {
    targetUser: string
    isPrivate: boolean
}

export type IMessage = MessagePayload & Partial<PrivateMessagePayload>

export interface RoomUsersPayload {
    room: string
    users: string[]
}