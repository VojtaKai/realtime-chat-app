import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import ScrollToTheBottom from 'react-scroll-to-bottom';
import {GiExitDoor} from 'react-icons/gi'

import classes from './Chat.module.css'

export interface ServerToClientEvents {
    message: (payload: MessagePayload) => void;
  }
  
export interface ClientToServerEvents {
    join: (name: string, room: string, cb: (error: string) => void) => void;
    sendMessage: (payload: MessagePayload) => void;
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

interface Message {
    user: string
    text: string
}

interface MessageProps {
    isOwner: boolean
    user: string
    text: string
}

const ENDPOINT = 'localhost:3000'


const Message = (props: MessageProps) => {
    return (
        <div className={ props.isOwner ? classes.messageEnvelopeRight : classes.messageEnvelopeLeft}>
            <h1 className={classes.message}>{props.text}</h1>
            <h1 className={classes.message}>{props.user}</h1>
        </div>
    )
}

const isMessageOwner = (name: string, messageAuthor: string) => name.replace(" ", "").trim().toLowerCase() === messageAuthor

export const Chat = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search)
    const navigate = useNavigate()
    const [name] = React.useState(queryParams.get('name') ?? '')
    const [room] = React.useState(queryParams.get('room') ?? '')

    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState<Message[]>([])

    const [socket, setSocket] = React.useState<Socket<ServerToClientEvents, ClientToServerEvents>>(io(ENDPOINT))
    
    React.useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(ENDPOINT);
        setSocket(socket)

        socket.emit('join', name, room, (errorMessage) => (alert(errorMessage)))

        return () => {
            socket.disconnect()
            socket.off()
            socket.send()
            setMessages([])
        }
    }, [io, ENDPOINT, search])

    React.useEffect(() => {
        socket.on('message', (message: MessagePayload) => {
            console.log('Message From The Server:' + 'User:', message.user, '\nText:', message.text)
            setMessages(prevMessages => [...prevMessages, message])
        })
    }, [socket])

    const onClickSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log('sendMessage', message)
        e.preventDefault()
        if (!message) {
            return
        }
        socket.emit('sendMessage', {
            user: name,
            text: message
        })
        setMessage('')
    }
    
    return (
        <div className={classes.chatWindowOuter}>
            <div className={classes.infoBar} >
                <h3>{`Room: ${room}`}</h3>
                <GiExitDoor size={48} style={{cursor: "pointer"}} color={'white'} onClick={() => navigate('/')} />
            </div>
            <ScrollToTheBottom className={classes.chatWindowInner} mode='bottom' scrollViewClassName={classes.chatWindowInnerChildren} >
                {messages.map(message => <Message user={message.user} text={message.text} key={Math.random().toString()} isOwner={isMessageOwner(name, message.user) } />)}
            </ScrollToTheBottom>
            <div className={classes.messageInputEnvelope}>
                <textarea className={classes.messageTextArea} onChange={(e) => setMessage(e.target.value)} placeholder='Type a message' value={message} onKeyDown={(e) => e.key === 'Enter' && onClickSend(e)} />
                <button type='button' onClick={onClickSend} className={classes.messageSendButton}>{'Send'}</button>
            </div>
        </div>
    )
}
