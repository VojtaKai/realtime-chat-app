import classes from "./RoomUsers.module.css"

interface RoomUsersProps {
    users: string[]
    onClickShowUsersHandler: () => void
    privateMessageHandler: (user: string) => void
}

export const RoomUsers = (props: RoomUsersProps) => {
    const { users, onClickShowUsersHandler, privateMessageHandler } = props

    return (
        <div className={classes.containerOuter}>
            <div className={classes.container}>
                <div className={classes.userTable}>
                    {users.map((user) => (
                        <h4
                            key={user}
                            className={classes.users}
                            onDoubleClick={() => privateMessageHandler(user)}
                        >
                            {user}
                        </h4>
                    ))}
                </div>
            </div>
            <button
                className={classes.button}
                onClick={onClickShowUsersHandler}
            >
                Close
            </button>
        </div>
    )
}
