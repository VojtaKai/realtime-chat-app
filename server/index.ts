import express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'
import { router } from './router'

const PORT = Number(process.env.PORT) || 3000

const app = express()
const server = http.createServer(app)
const io = new socketio.Server(server)

app.get('/', (req, res, next) => {
    console.log('here')
})

io.on('connnection', (socket) => {
    console.log('connected', socket)
})

app.use(router)

server.listen(PORT, () => (console.log(`Server is running on port ${PORT}`)))