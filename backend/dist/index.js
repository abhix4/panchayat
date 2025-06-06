"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
// import { createClient } from "redis"
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()
// const client = createClient ({
//   url : "rediss://default:AUEaAAIjcDE4ZDNmMDMxN2IzNjc0YmQ4YWFiMmU4ZGMyZGU2ZDJlZHAxMA@immense-parrot-16666.upstash.io:6379"
// });
const app = (0, express_1.default)();
app.use(express_1.default.json());
const httpServer = app.listen(3001, () => {
    console.log("server running on port 3001 🚀");
});
// async function connectClient(){
//   client.on("error", function(err) {
//     throw err;
//   });
//   await client.connect()
//   console.log("connected")
// }
const wsServer = new ws_1.WebSocket.Server({ server: httpServer });
let allSockets = [];
let chatRooms = [];
wsServer.on('connection', (socket) => {
    socket.on('error', (error) => console.log(error));
    socket.on('message', (message) => {
        // wsServer.clients.forEach(function each(client) {
        //     if (client !== socket && client.readyState === WebSocket.OPEN) {
        //       client.send(message, {binary: isBinary});
        //       //console.log(client)
        //     }
        // });
        var _a;
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
                username: parsedMessage.payload.username,
                avatarUrl: parsedMessage.payload.avatarUrl
            });
            if (!chatRooms.some((x) => x.roomId === parsedMessage.payload.roomId)) {
                chatRooms.push({
                    roomId: parsedMessage.payload.roomId,
                    users: allSockets
                        .filter((user) => user.room === parsedMessage.payload.roomId)
                        .map((user) => ({
                        socket: user.socket,
                        room: user.room,
                        username: user.username,
                        avatarUrl: user.avatarUrl,
                    })),
                    messages: [],
                });
            }
            else {
                chatRooms = chatRooms.map((room) => room.roomId === parsedMessage.payload.roomId
                    ? Object.assign(Object.assign({}, room), { users: allSockets
                            .filter((user) => user.room === parsedMessage.payload.roomId)
                            .map((user) => ({
                            socket: user.socket,
                            room: user.room,
                            username: user.username,
                            avatarUrl: user.avatarUrl,
                        })) }) : room);
            }
            const userInRoom = allSockets.filter((x) => x.room === parsedMessage.payload.roomId);
            // addUserAndRoom({username:parsedMessage.payload.username,avatarUrl:parsedMessage.payload.avatarUrl,roomId:parsedMessage.payload.roomId})
            userInRoom.forEach((x) => {
                var _a, _b;
                x.socket.send(JSON.stringify({
                    type: "join",
                    payload: {
                        usersAvailable: userInRoom.length,
                        joined: ((_a = chatRooms.find((y) => y.roomId === parsedMessage.payload.roomId)) === null || _a === void 0 ? void 0 : _a.users) || [],
                        prevChats: ((_b = chatRooms.find((y) => y.roomId === parsedMessage.payload.roomId)) === null || _b === void 0 ? void 0 : _b.messages) || [],
                    }
                }));
            });
            // const userRoom = allSockets.find((x) => x.socket == socket)
            // const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
            // let usersInRoom = [];
            // currRoom.forEach((function(x){
            //   usersInRoom.push(x.username)
            //   x.socket.send(JSON.stringify(usersInRoom))
            // }))
            console.log('user in room', ((_a = chatRooms.find((y) => y.roomId === parsedMessage.payload.roomId)) === null || _a === void 0 ? void 0 : _a.users) || []);
        }
        if (parsedMessage.type === "chat") {
            const userRoom = allSockets.find((x) => x.socket == socket);
            const currRoom = allSockets.filter((x) => x.room == (userRoom === null || userRoom === void 0 ? void 0 : userRoom.room));
            currRoom.forEach((function (x) {
                x.socket.send(JSON.stringify({
                    type: "chat",
                    payload: parsedMessage.payload
                }));
            }));
            chatRooms.map((room) => {
                var _a;
                if (room.roomId === (userRoom === null || userRoom === void 0 ? void 0 : userRoom.room)) {
                    (_a = room.messages) === null || _a === void 0 ? void 0 : _a.push({
                        avatarUrl: parsedMessage.payload.avatarUrl,
                        username: parsedMessage.payload.username,
                        message: parsedMessage.payload.message
                    });
                }
            });
            // addChat({username:parsedMessage.payload.username,message:parsedMessage.payload.message,roomId:parsedMessage.payload.roomId})
        }
        if (parsedMessage.type === "close") {
            const userRoom = allSockets.find((x) => x.socket == socket);
            const currRoom = allSockets.filter((x) => x.room == (userRoom === null || userRoom === void 0 ? void 0 : userRoom.room));
            currRoom.forEach((x) => {
                x.socket.send(JSON.stringify({
                    type: "close",
                    payload: `${userRoom === null || userRoom === void 0 ? void 0 : userRoom.username} has left the room`
                }));
            });
        }
        socket.on("close", () => {
            const user = allSockets.find((x) => x.socket == socket);
            const temp = allSockets.filter((x) => x == user);
            allSockets = temp;
        });
    });
    console.log('Client connected');
});
// app.post('/', async(req,res) :Promise<any> =>{
//   const username = req.body.username
//   const avatarUrl = req.body.avatarUrl;
//   try {
//      await prisma.user.create({
//     data:{
//       username : username,
//       avatar:avatarUrl
//     }
//   })
//   } catch (error) {
//     return res.json({
//       msg:error
//     })
//   }
//   res.json({
//     msg:"hi there!!"
//   })
// })
// async function addUserAndRoom({username,avatarUrl,roomId}:{username:string,avatarUrl:string,roomId:string,}){
// try {
//   const userExists = await prisma.user.findFirst({
//     where:{
//       username:username
//     }
//   })
//   if(!userExists){
//     const user = await prisma.user.create({
//       data:{
//         username:username,
//         avatar:avatarUrl
//       }
//     })
//     const userId = user.id
//     const roomExists = await prisma.room.findFirst({
//       where:{
//         roomId:roomId
//       }
//     })
//     if(!roomExists){
//       await prisma.room.create({
//         data:{
//           roomId:roomId,
//           user:{
//             connect:{
//               id:userId
//             }
//           }
//         }
//       })
//     }
//     else {
//       await prisma.room.update({
//         where:{
//           roomId:roomId
//         },
//         data:{
//           user:{
//             connect:{
//               id:userId
//             }
//           }
//         }
//       })
//     }
//   }
//   else {
//     return "user already exists"
//   }
//   console.log("user added")
// } catch (error) {
//   console.log(error)
// }
// }
// async function addChat({username,message,roomId}:any){
//   try {
//     await prisma.chat.create({
//       data:{
//         message:message,
//         user:{
//           connect:{
//             username:username
//           }
//         },
//         room:{
//           connect:{
//             roomId:roomId
//           }
//         }
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
