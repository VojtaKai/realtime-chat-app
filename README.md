# realtime-chat-app
Realtime chat application created using Socket.io, ReactJS, and NodeJS.
Users can join different rooms, chat with all participants in the room or send private messages 

# Technologies
ReactJS
NodeJS
Socket.io
Vite
NPM

# Start locally
Start the App by going to the client folder and run [npm run dev]
It will expose the app on port 5173. Visit the SPA on localhost:5173

Start the Web Server by going to the server folder and run [npm start]
It will expose the server on port 3000.


# How to make ts-node and nodemon work together
ts-node - JIT compilation of TS to JS
nodemon - hot server = restart server on change

https://khalilstemmler.com/blogs/typescript/node-starter-project/
https://dev.to/codarbind/how-to-automatically-compile-typescript-files-to-javascript-files-and-run-the-nodejs-server-automatically-4n54

# Issues encountered along the way
- Since Socket.IO v3 you need to explicitly enable CORS when your client is on different port than your server -> enable cors on the server side
https://socket.io/docs/v3/handling-cors/

# Socket.io cheatsheet
Socket io - emit cheatsheet - https://socket-io.translate.goog/docs/v4/emit-cheatsheet?_x_tr_sl=en&_x_tr_tl=cs&_x_tr_hl=cs&_x_tr_pto=sc