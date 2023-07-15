import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Join.module.css'


export const Join = () => {
    const [name, setName] = React.useState('')
    const [room, setRoom] = React.useState('')

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const roomChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value)
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>JOIN</h1>
            <div className={classes.line}></div>
            <input type='text' id='name' placeholder='Enter name' value={name} onChange={nameChangeHandler} className={classes.input} />
            <input type='text' id='room' placeholder='Enter room' value={room} onChange={roomChangeHandler} className={classes.input} />
            <Link to={`/chat?name=${name}&room=${room}`} onClick={(e: React.MouseEvent) => (!name || !room) ? e.preventDefault() : null}>
                <button type='submit' className={classes.button}>Sign In</button>
            </Link>
        </div>
    )
}