import * as React from 'react'
import classes from './RoomUsers.module.css'

interface RoomUsers {
    users: string[]
    setShowUsers: React.Dispatch<React.SetStateAction<boolean>>
    privateMessageHandler: (user: string) => void 
}

export const RoomUsers = (props: RoomUsers) => {

    return (
        <div className={classes.containerOuter}>
            <div className={classes.container}>
                <div className={classes.userTable}>
                        {
                            props.users.map(user => {
                                return (
                                    <h6 key={user} className={classes.users} onDoubleClick={() => props.privateMessageHandler(user)}>{user}</h6>
                                )
                            })
                        }
                </div>
            </div>
                <button className={classes.button} onClick={() => props.setShowUsers(false)}>Close</button>
        </div>
    )
}