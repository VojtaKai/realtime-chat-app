# realtime-chat-app
Realtime chat application created using Socket.io, ReactJS, and NodeJS.
Users can join different rooms, chat with all participants in the room or send private messages.

# Technologies
- ReactJS
- NodeJS
- Socket.io
- Vite
- NPM

# Start locally
Start the App by going to the client folder and run `npm run dev` \
It will expose the app on port 5173. Visit the App on localhost:5173

Start the Web Server by going to the server folder and run `npm start` \
It will expose the server on port 3000.


## How to make ts-node and nodemon work together
- ts-node - JIT compilation of TS to JS
- nodemon - hot server = restart server on change

https://khalilstemmler.com/blogs/typescript/node-starter-project/ \
https://dev.to/codarbind/how-to-automatically-compile-typescript-files-to-javascript-files-and-run-the-nodejs-server-automatically-4n54

## Linter and Formatter
- eslint
- prettier

## Issues encountered along the way
- Since Socket.IO v3 you need to explicitly enable CORS when your client is on different port than your server -> enable cors on the server side
https://socket.io/docs/v3/handling-cors/

## Socket.io cheatsheet
https://socket.io/docs/v4/emit-cheatsheet/

## Eslint rules and setup
https://eslint.org/docs/latest/rules/ \
https://eslint.org/docs/latest/use/getting-started (manual or automatic setup) \ 
https://www.aleksandrhovhannisyan.com/blog/format-code-on-save-vs-code-eslint/ \
https://blog.logrocket.com/linting-typescript-eslint-prettier/#integrating-prettier

## Prettier options
https://prettier.io/docs/en/options.html
