import {useNavigate} from 'react-router-dom'
import {GiExitDoor} from 'react-icons/gi'
import {HiUsers} from 'react-icons/hi'

import classes from './InfoBar.module.css'

interface InfoBarProps {
    room: string
    onClickShowUsersHandler: () => void
}

export const InfoBar = (props: InfoBarProps) => {
    const navigate = useNavigate()

    const {room, onClickShowUsersHandler} = props

    return (
        <div className={classes.infoBar}>
            <h3>{`Room: ${room}`}</h3>
            <div>
                <HiUsers size={48} style={{cursor: 'pointer', marginRight: '40px'}} onClick={onClickShowUsersHandler} />
                <GiExitDoor size={48} style={{cursor: 'pointer'}} onClick={() => navigate('/')} />
            </div>
        </div>
    )
}
