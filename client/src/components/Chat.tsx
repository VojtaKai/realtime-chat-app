import * as React from 'react'
import { useLocation } from 'react-router-dom'
import classes from './Chat.module.css'
import { io, Socket } from 'socket.io-client'

export interface ServerToClientEvents {
    message: (payload: MessagePayload) => void;
  }
  
export interface ClientToServerEvents {
    join: (name: string, room: string, cb: (error: string) => void) => void
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

const ENDPOINT = 'localhost:3000'


export const Chat = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search)
    const [name] = React.useState(queryParams.get('name') ?? '')
    const [room] = React.useState(queryParams.get('room') ?? '')

    React.useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(ENDPOINT);

        socket.on('message', (payload: MessagePayload) => {
            console.log('Message From The Server:' + 'User:', payload.user, '\nText:', payload.text)
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
