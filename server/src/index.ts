import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { router } from "./router";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./utils/interfaces";
import { addUser, getUser, getUserByName, getUsersInRoom, removeUser } from "./users";

const PORT = Number(process.env.PORT) || 3000;

const app = express();
const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: "*",
    },
});

io.on("connection", socket => {
    socket.on("join", (name, room, cb) => {
        try {
            const addedUser = addUser(socket.id, name, room);

            // socket.join adds users to a specific room - room is an independent space from other rooms
            // to leave a room perform socket.leave(room)
            socket.join(addedUser.room);

            socket.emit("message", {
                user: "admin",
                text: `Welcome to the room ${addedUser.room}, ${addedUser.name}!`,
            });

            // socket.broadcast - to everyone except the socketId that joined, to ALL the rooms // tested?
            // socket.broadcast.to(room) === socket.to(room) - to everyone in the room except the socketId
            socket.to(addedUser.room).emit("message", {
                user: "admin",
                text: `User ${addedUser.name} has joined!`,
            });

            io.to(room).emit("roomUsers", {
                room: room,
                users: getUsersInRoom(room),
            });
        } catch (error: any) {
            return cb(error.message);
        }
    });

    socket.on("disconnect", () => {
        const user = getUser(socket.id);
        if (!user) {
            return;
        }
        socket.to(user.room).emit("message", {
            user: "admin",
            text: `User ${user.name} left the chat.`,
        });
        removeUser(socket.id);

        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getUsersInRoom(user.room),
        });
    });

    socket.on("sendMessage", (payload, callback) => {
        if (!payload.text) {
            return;
        }
        const user = getUser(socket.id);

        if (!user) {
            return console.error("Missing user!!!");
        }

        // io sends it to everyone, socket.emit would not reach the author of the message - socket ignores the socket.id user
        io.to(user.room).emit("message", {
            user: user.name, // back to lowercase
            text: payload.text,
        });

        callback();
    });

    socket.on("sendPrivateMessage", (payload, callback) => {
        if (!payload.text) {
            return;
        }

        const user = getUserByName(payload.user);
        const targetUser = getUserByName(payload.targetUser);

        if (!targetUser || !user) {
            return console.error("Missing user!!!");
        }

        if (user.name === targetUser.name) {
            return;
        }

        const privateMessagePayload = {
            user: user.name,
            text: payload.text,
            targetUser: targetUser.name,
            isPrivate: true,
        };

        socket.to(targetUser.socketId).emit("privateMessage", privateMessagePayload);
        io.to(socket.id).emit("privateMessage", privateMessagePayload);
        // io.to(room).to(socket.id).emit(...) - sends to both - to the room and to the specified socketId.

        callback();
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
