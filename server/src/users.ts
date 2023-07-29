import { User } from "./utils/interfaces";

const users: User[] = [];
// I could use set and maps for faster retrievals / removals

export const addUser = (socketId: string, name: string, room: string) => {
    name = name.replace(" ", "").trim().toLowerCase();
    room = room.replace(" ", "").trim().toLowerCase();

    const existingUser = users.find(user => user.room === room && user.name === name);
    if (existingUser) {
        throw new Error("Chosen username is already taken for this room");
    }

    const user: User = {
        socketId,
        name,
        room
    };

    users.push(user);

    return user;
};

export const removeUser = (socketId: string) => {
    const userIndex = users.findIndex(user => user.socketId === socketId);

    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0];
    }
};

export const getUser = (socketId: string) => users.find(user => user.socketId === socketId);

export const getUserByName = (name: string) => users.find(user => user.name === name.replace(" ", "").trim().toLowerCase());

export const getUsersInRoom = (room: string) => users.filter(user => user.room === room).map(user => user.name);