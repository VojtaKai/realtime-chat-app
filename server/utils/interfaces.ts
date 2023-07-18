export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    gotcha: (message: string, number: number) => void;
  }
  
export interface ClientToServerEvents {
    hello: () => void;
    join: (name: string, room: string, cb: (error: string) => void) => void
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}