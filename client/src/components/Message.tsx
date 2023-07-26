import * as React from 'react'

import { IMessage } from '../utils/interfaces'
import classes from './Message.module.css'

interface MessageProps {
    message: IMessage
    isOwner: boolean
    setIsPrivateMessage: React.Dispatch<React.SetStateAction<boolean>>
    setPrivateMessageUser: React.Dispatch<React.SetStateAction<string>>
}

export const Message = (props: MessageProps) => {
    const { isOwner, message, setIsPrivateMessage, setPrivateMessageUser} = props
    const {text, user, targetUser, isPrivate} = message

    const onDoubleClickHandler = () => {
        if (isOwner || user === 'admin') {
            return
        }
        setIsPrivateMessage(true)
        setPrivateMessageUser(user)
    }

    return (
        <div className={ isOwner ? classes.messageEnvelopeOuterRight : classes.messageEnvelopeOuterLeft}>
            {isOwner && !isPrivate && <h1 className={classes.message}>{'You'}</h1>}
            {isOwner && isPrivate && targetUser && <h1 className={classes.message}>{`Whispering to ${targetUser}`}</h1>}
            <div className={message.isPrivate ? classes.messageEnvelopePrivate : classes.messageEnvelope} onDoubleClick={onDoubleClickHandler} >
                <h1 className={classes.message}>{text}</h1>
            </div>
            {!isOwner && !isPrivate && <h1 className={classes.message}>{user}</h1>}
            {!isOwner && isPrivate && <h1 className={classes.message}>{`${user} whispers`}</h1>}
        </div>
    )
}