import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useLocation, useParams } from 'react-router-dom'
import classes from './Chat.module.css'
import { io, Manager, Socket } from 'socket.io-client'

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

const ENDPOINT = 'localhost:3000'


export const Chat = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search)
    const [name] = React.useState(queryParams.get('name') ?? '')
    const [room] = React.useState(queryParams.get('room') ?? '')

    console.log('name', name)
    console.log('room', room)

    React.useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(ENDPOINT);
        console.log('socket', socket)
        console.log('transports', socket.io.engine.transport)
        console.log('socket.activate', socket.active, socket.connected)

        console.log('socket id', socket.id)

        socket.on('gotcha', (message, number) => {
            console.log('GOTCHAA - message:', message)
            console.log('GOTCHAA - number:', number)
        })

        socket.emit('join', name, room, (errorMessage) => (alert(errorMessage)))

        return () => {
            socket.disconnect()
            socket.off()
            socket.send()
        }
    }, [io, ENDPOINT, search])
    return <div style={{color: 'white'}}>CHAT</div>
}
