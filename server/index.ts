import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { router } from './router'
import { ClientToServerEvents, InterServerEvents, MessagePayload, ServerToClientEvents, SocketData } from './utils/interfaces'
import { addUser, getUser, removeUser } from './users'


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
    socket.on('join', (name, room, cb) => {
        try {
            const addedUser = addUser(socket.id, name, room)
            
            // socket.join adds users to a specific room - room is an independent space from other rooms
            // to leave a room perform socket.leave(room)
            socket.join(addedUser.room)


            socket.emit('message', {
                user: 'admin',
                text: `Welcome to the room ${addedUser.room}, ${addedUser.name}!`
            })

            // socket.broadcast - to everyone except the socketId that joined, to ALL the rooms
            // socket.broadcast.to(room) === socket.to(room) - to everyone in the room except the socketId
            socket.to(addedUser.room).emit('message', {
                user: 'admin',
                text: `User ${addedUser.name} has joined!`
            })
        } catch (error: any) {
            return cb(error.message)
        }
    })

    socket.on('disconnect', () => {
        console.log('User has left!')
        removeUser(socket.id)
    })

    socket.on('sendMessage', (payload: MessagePayload) => {
        console.log('send from client', payload)
        if (!payload.text) {
            return
        }
        const user = getUser(socket.id)
        if (!user) {
            throw new Error('Missing user!!!')
        }
        // io sends it to everyone, socket.emit would not reach the author of the message - socket ignores the socket.id user
        io.to(user.room).emit('message', {
            user: user.name, // back to lowercase
            text: payload.text
        })
    })
})

app.use(router)

server.listen(PORT, () => (console.log(`Server is running on port ${PORT}`)))