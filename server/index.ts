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

    socket.on('hello', () => {
        console.log('Hello called')
    })
})

app.use(router)

server.listen(PORT, () => (console.log(`Server is running on port ${PORT}`)))