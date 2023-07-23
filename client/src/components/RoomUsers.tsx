import * as React from 'react'
import classes from './RoomUsers.module.css'

interface RoomUsers {
    users: string[]
    setShowUsers: React.Dispatch<React.SetStateAction<boolean>>
    privateMessageHandler: (user: string) => void
}

export const RoomUsers = (props: RoomUsers) => {
    const { users, setShowUsers, privateMessageHandler} = props

    return (
        <div className={classes.containerOuter}>
            <div className={classes.container}>
                <div className={classes.userTable}>
                        {
                            users.map(user => <h6 key={user} className={classes.users} onDoubleClick={() => privateMessageHandler(user)}>{user}</h6>)
                        }
                </div>
            </div>
                <button className={classes.button} onClick={() => setShowUsers(false)}>Close</button>
        </div>
    )
}