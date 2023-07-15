import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { router } from './router'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './utils/interfaces'


const PORT = Number(process.env.PORT) || 3000

const app = express()
const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server)

io.on('connection', (socket) => {
    console.log('connected', socket)

    socket.on('disconnect', () => {
        console.log('User has left!')
    })
})

app.use(router)

server.listen(PORT, () => (console.log(`Server is running on port ${PORT}`)))