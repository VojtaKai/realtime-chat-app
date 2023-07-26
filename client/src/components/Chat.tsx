import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { RoomUsers } from './RoomUsers';
import { 
    ClientToServerEvents, 
    IMessage, 
    MessagePayload, 
    PrivateMessagePayload, 
    RoomUsersPayload, 
    ServerToClientEvents 
} from '../utils/interfaces';
import { MessageSection } from './MessageSection';
import { InfoBar } from './InfoBar'
import { InputBar } from './InputBar';

import classes from './Chat.module.css'

const ENDPOINT = 'localhost:3000'

const isMessageOwner = (name: string, messageAuthor: string) => name.replace(" ", "").trim().toLowerCase() === messageAuthor.replace(" ", "").trim().toLowerCase()

export const Chat = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search)

    const [name] = React.useState(queryParams.get('name') ?? '')
    const [room] = React.useState(queryParams.get('room') ?? '')

    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState<IMessage[]>([])

    const [showUsers, setShowUsers] = React.useState<boolean>(false)
    
    const [roomUsers, setRoomUsers] = React.useState<string[]>([])

    const [isPrivateMessage, setIsPrivateMessage] = React.useState<boolean>(false)
    const [privateMessageUser, setPrivateMessageUser] = React.useState<string>('')

    const [socket, setSocket] = React.useState<Socket<ServerToClientEvents, ClientToServerEvents>>(io(ENDPOINT))

    const inputRef = React.useRef<HTMLTextAreaElement | null>(null)
    
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
    }, [search, name, room])

    React.useEffect(() => {
        socket.on('message', (message: MessagePayload) => setMessages(prevMessages => [...prevMessages, message]))
    }, [socket])

    React.useEffect(() => {
        socket.on('privateMessage', (message: PrivateMessagePayload) => setMessages(prevMessages => [...prevMessages, message]))
    }, [socket])

    React.useEffect(() => {
        socket.on('roomUsers', (roomUsers: RoomUsersPayload) => {
            setRoomUsers(roomUsers.users)
        })
    }, [socket])

    React.useEffect(() => {
        inputRef.current?.focus()
    }, [privateMessageUser, inputRef])

    const onClickSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (!message) {
            return
        }

        socket.emit('sendMessage', {
            user: name,
            text: message
        }, () => setMessage(''))
        
    }

    const onClickSendPrivate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (!message) {
            return
        }

        socket.emit('sendPrivateMessage', {
            user: name,
            targetUser: privateMessageUser,
            text: message,
            isPrivate: true
        }, () => {
            setMessage('')
        })
    }

    const privateMessageHandler = (user: string) => {
        if (isMessageOwner(name, user)) {
            return
        }
        setIsPrivateMessage(true)
        setPrivateMessageUser(user)
        setShowUsers(false)
        inputRef.current?.focus()
    }

    const onClickShowUsersHandler = () => setShowUsers(prevState => !prevState)

    const onChangeMessageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)

    const onClickPrivateMessageHandler = () => {
        setIsPrivateMessage(false)
        setPrivateMessageUser("")
    }
    
    return (
        <div className={classes.chatWindowOuter}>
            <div className={showUsers ? classes.chatWindowInnerSmall : classes.chatWindowInnerLarge}>
                <InfoBar room={room} onClickShowUsersHandler={onClickShowUsersHandler} />
                <MessageSection name={name} messages={messages} isMessageOwner={isMessageOwner} setIsPrivateMessage={setIsPrivateMessage} setPrivateMessageUser={setPrivateMessageUser} />
                <InputBar ref={inputRef} message={message} onChangeMessageHandler={onChangeMessageHandler} privateMessageUser={privateMessageUser} onClickPrivateMessageHandler={onClickPrivateMessageHandler} onClickSend={onClickSend} onClickSendPrivate={onClickSendPrivate} isPrivateMessage={isPrivateMessage} />
            </div>
            { showUsers && 
                <RoomUsers 
                    users={roomUsers} 
                    privateMessageHandler={privateMessageHandler}
                    onClickShowUsersHandler={onClickShowUsersHandler}
                /> 
            }
        </div>
    )
}
