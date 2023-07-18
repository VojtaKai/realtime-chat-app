import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { router } from './router'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './utils/interfaces'


const PORT = Number(process.env.PORT) || 3000

const app = express()
const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: '*'
    }
})

io.on('connection', (socket) => {
    console.log('USER CONNECTED')

    socket.on('disconnect', () => {
        console.log('User has left!')
    })

    console.log('socket id', socket.id)

    io.emit('gotcha', 'randomMessage', 10)

    socket.on('hello', () => {
        console.log('Hello called')
    })

    socket.on('join', (name, room, cb) => {
        console.log('From FE - name', name)
        console.log('From FE - room', room)

        // const error = true

        // if (error) {
        //     cb('Error Message')
        // }
    })
})

app.use(router)

server.listen(PORT, () => (console.log(`Server is running on port ${PORT}`)))