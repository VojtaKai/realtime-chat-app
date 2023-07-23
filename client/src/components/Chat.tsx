import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import ScrollToTheBottom from 'react-scroll-to-bottom';
import {GiExitDoor} from 'react-icons/gi'
import {HiUsers} from 'react-icons/hi'
import {AiOutlineStop} from 'react-icons/ai'

import classes from './Chat.module.css'
import { RoomUsers } from './RoomUsers';
import { 
    ClientToServerEvents, 
    IMessage, 
    MessagePayload, 
    PrivateMessagePayload, 
    RoomUsersPayload, 
    ServerToClientEvents 
} from '../utils/interfaces';
import { Message } from './Message';

const ENDPOINT = 'localhost:3000'

const isMessageOwner = (name: string, messageAuthor: string) => name.replace(" ", "").trim().toLowerCase() === messageAuthor.replace(" ", "").trim().toLowerCase()

export const Chat = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search)
    const navigate = useNavigate()

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
    }, [io, ENDPOINT, search])

    React.useEffect(() => {
        socket.on('message', (message: MessagePayload) => {
            console.log('Message From The Server:' + 'User:', message.user, '\nText:', message.text)
            setMessages(prevMessages => [...prevMessages, message])
        })
    }, [socket])

    React.useEffect(() => {
        socket.on('privateMessage', (message: PrivateMessagePayload) => {
            console.log('Message From The Server:' + 'User:', message.user, '\nText:', message.text)
            setMessages(prevMessages => [...prevMessages, message])
        })
    }, [socket])

    React.useEffect(() => {
        socket.on('roomUsers', (roomUsers: RoomUsersPayload) => {
            setRoomUsers(roomUsers.users)
        })
    }, [socket])

    React.useEffect(() => {
        inputRef.current?.focus()
    }, [privateMessageUser, inputRef, inputRef.current])

    const onClickSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log('sendMessage', message)
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
        console.log('sendPrivateMessage', message)
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
    
    return (
        <div className={classes.chatWindowOuter}>
            <div className={showUsers ? classes.chatWindowInnerSmall : classes.chatWindowInnerLarge}>
                <div className={classes.infoBar} >
                    <h3>{`Room: ${room}`}</h3>
                    <div>
                        <HiUsers size={48} style={{cursor: "pointer", marginRight: '40px'}} onClick={() => setShowUsers(prevState => !prevState)} />
                        <GiExitDoor size={48} style={{cursor: "pointer"}} onClick={() => navigate('/')} />
                    </div>
                </div>
                <ScrollToTheBottom className={classes.chatMessageSection} mode='bottom' scrollViewClassName={classes.chatMessageSectionChildren} >
                    {messages.map(message => 
                        <Message
                            message={message}
                            key={Math.random().toString()} 
                            isOwner={isMessageOwner(name, message.user)}
                            setIsPrivateMessage={setIsPrivateMessage}
                            setPrivateMessageUser={setPrivateMessageUser}
                        />)}
                </ScrollToTheBottom>
                { isPrivateMessage ? 
                     <div className={classes.messageInputEnvelope}>
                        <h6 style={{height: '36px', margin: '0px'}}>{`Private message to ${privateMessageUser}`}</h6>
                        <AiOutlineStop size={16} style={{alignSelf: 'center', cursor: 'pointer'}} onClick={() => {
                            setIsPrivateMessage(false)
                            setPrivateMessageUser('')
                        }} />
                        <textarea ref={inputRef} className={classes.messageTextArea} onChange={(e) => setMessage(e.target.value)} placeholder='Type a message' value={message} onKeyDown={(e) => e.key === 'Enter' && onClickSendPrivate(e)} />
                        <button type='button' onClick={onClickSendPrivate} className={classes.messageSendButton}>{'Send'}</button>
                    </div>
                    : 
                    <div className={classes.messageInputEnvelope}>
                        <textarea ref={inputRef} className={classes.messageTextArea} onChange={(e) => setMessage(e.target.value)} placeholder='Type a message' value={message} onKeyDown={(e) => e.key === 'Enter' && onClickSend(e)} />
                        <button type='button' onClick={onClickSend} className={classes.messageSendButton}>{'Send'}</button>
                    </div>
                }
            </div>
            { showUsers && 
                <RoomUsers 
                    users={roomUsers} 
                    setShowUsers={setShowUsers} 
                    privateMessageHandler={privateMessageHandler}
                /> 
            }
        </div>
    )
}
