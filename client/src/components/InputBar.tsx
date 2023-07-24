import React from 'react'
import {AiOutlineStop} from 'react-icons/ai'

import classes from './InputBar.module.css'

interface InputBarProps {
    message: string
    isPrivateMessage: boolean
    privateMessageUser: string
    onClickPrivateMessageHandler: () => void
    onChangeMessageHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onClickSendPrivate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>) => void
    onClickSend: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export const InputBar = React.forwardRef((props: InputBarProps, inputRef: React.ForwardedRef<HTMLTextAreaElement | null>) => {
    const { message, isPrivateMessage, privateMessageUser, onChangeMessageHandler, onClickSend, onClickPrivateMessageHandler, onClickSendPrivate } = props

    return (
        <>
            { isPrivateMessage ? 
                <div className={classes.messageInputEnvelope} >
                    <h6 style={{height: '36px', margin: '0px'}}>{`Private message to ${privateMessageUser}`}</h6>
                    <AiOutlineStop size={16} style={{alignSelf: 'center', cursor: 'pointer'}} onClick={onClickPrivateMessageHandler} />
                    <textarea ref={inputRef} className={classes.messageTextArea} onChange={onChangeMessageHandler} placeholder='Type a message' value={message} onKeyDown={(e) => e.key === 'Enter' && onClickSendPrivate(e)} />
                    <button type='button' onClick={onClickSendPrivate} className={classes.messageSendButton}>{'Send'}</button>
                </div>
                : 
                <div className={classes.messageInputEnvelope}>
                    <textarea ref={inputRef} className={classes.messageTextArea} onChange={onChangeMessageHandler} placeholder='Type a message' value={message} onKeyDown={(e) => e.key === 'Enter' && onClickSend(e)} />
                    <button type='button' onClick={onClickSend} className={classes.messageSendButton}>{'Send'}</button>
                </div>
                        
            }
        </>
    )
})