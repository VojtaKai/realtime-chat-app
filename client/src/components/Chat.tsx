import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useLocation, useParams } from 'react-router-dom'
import classes from './Chat.module.css'
import { io, Manager, Socket } from 'socket.io-client'

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
export interface ClientToServerEvents {
    hello: () => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}

const ENDPOINT = 'localhost:3000'


export const Chat = () => {
    const { search, pathname } = useLocation();
    const queryParams = new URLSearchParams(search)
    const [name] = React.useState(queryParams.get('name'))
    const [room] = React.useState(queryParams.get('room'))

    React.useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(ENDPOINT);
        console.log('transports', socket.io.engine.transport)
        console.log('socket.activate', socket.active, socket.connected)

        return () => {
            socket.disconnect()
        }
    }, [io])
    return <div style={{color: 'white'}}>CHAT</div>
}
