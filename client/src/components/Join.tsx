import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Join.module.css'


export const Join = () => {
    const [name, setName] = React.useState('')
    const [room, setRoom] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const roomChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value)
    }

    const onClickEnter = (e: React.MouseEvent) => {
        if (!name) {
            setErrorMessage('Enter your username')
            e.preventDefault()
            return
        }
        if (!room) {
            setErrorMessage('Enter the name of the room')
            e.preventDefault()
            return
        }
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>JOIN</h1>
            <div className={classes.line}></div>
            <input type='text' id='name' placeholder='Enter name' value={name} onChange={nameChangeHandler} className={classes.input} />
            <input type='text' id='room' placeholder='Enter room' value={room} onChange={roomChangeHandler} className={classes.input} />
            <Link to={`/chat?name=${name}&room=${room}`} onClick={onClickEnter} >
                <button type='submit' className={classes.button}>Sign In</button>
            </Link>
            {!!errorMessage && <h3 className={classes.errorMessage}>{errorMessage}</h3>}
        </div>
    )
}