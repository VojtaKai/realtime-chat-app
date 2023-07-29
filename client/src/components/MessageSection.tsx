import React from "react"
import ScrollToTheBottom from "react-scroll-to-bottom"
import classes from "./MessageSection.module.css"
import { IMessage } from "../utils/interfaces"
import { Message } from "./Message"

interface MessageSectionProps {
    name: string
    messages: IMessage[]
    isMessageOwner: (name: string, messageAuthor: string) => boolean
    setIsPrivateMessage: React.Dispatch<React.SetStateAction<boolean>>
    setPrivateMessageUser: React.Dispatch<React.SetStateAction<string>>
}

export const MessageSection = (props: MessageSectionProps) => {
    const { name, messages, isMessageOwner, setIsPrivateMessage, setPrivateMessageUser } = props
    return (
        <ScrollToTheBottom
            className={classes.chatMessageSection}
            mode="bottom"
            scrollViewClassName={classes.chatMessageSectionChildren}
        >
            {messages.map(message => (
                <Message
                    message={message}
                    key={Math.random().toString()}
                    isOwner={isMessageOwner(name, message.user)}
                    setIsPrivateMessage={setIsPrivateMessage}
                    setPrivateMessageUser={setPrivateMessageUser}
                />
            ))}
        </ScrollToTheBottom>
    )
}
