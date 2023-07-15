# realtime-chat-app
Realtime chat application using Socket.io, ReactJS, and NodeJS

# Setup ts to js and nodemon working together
https://khalilstemmler.com/blogs/typescript/node-starter-project/

https://dev.to/codarbind/how-to-automatically-compile-typescript-files-to-javascript-files-and-run-the-nodejs-server-automatically-4n54

# Issues I encountered along the way
- Since Socket.IO v3 you need to explicitly enable CORS when your client is on different port than your server -> enable cors on the server side
https://socket.io/docs/v3/handling-cors/
