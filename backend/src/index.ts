import express, { json } from 'express';
import { WebSocket } from 'ws';
import { createClient } from "redis"
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient()



// const client = createClient ({
//   url : "rediss://default:AUEaAAIjcDE4ZDNmMDMxN2IzNjc0YmQ4YWFiMmU4ZGMyZGU2ZDJlZHAxMA@immense-parrot-16666.upstash.io:6379"
// });



const app = express();
app.use(express.json())

const httpServer = app.listen(3001, () => {
  console.log("server running on port 3001 🚀")
});

// async function connectClient(){
//   client.on("error", function(err) {
//     throw err;
//   });
//   await client.connect()
//   console.log("connected")
// }

const wsServer = new WebSocket.Server({ server: httpServer });
// connectClient()

type User = {
  socket : WebSocket ;
  room : string ;
  username:string;
  avatarUrl:string;
}

type Message = {
  avatarUrl:string;
  username:string;
  message:string;
}

type ChatRoom = {
  roomId ?: string;
  users ? : User[];
  messages? : Message[];
}

let allSockets : User[] = []
let chatRooms : ChatRoom[] = []

wsServer.on('connection', (socket) => {
  
  socket.on('error', (error) => console.log(error));
  
  socket.on('message', (message : string) => {

    // wsServer.clients.forEach(function each(client) {
    //     if (client !== socket && client.readyState === WebSocket.OPEN) {
    //       client.send(message, {binary: isBinary});
    //       //console.log(client)
    //     }
    // });
   
    const parsedMessage = JSON.parse(message)
    console.log(parsedMessage)
    if(parsedMessage.type === "join"){
      allSockets.push({
        socket,
        room:parsedMessage.payload.roomId,
        username:parsedMessage.payload.username,
        avatarUrl:parsedMessage.payload.avatarUrl
      })

      if(!chatRooms.some((x : ChatRoom) => x.roomId === parsedMessage.payload.roomId)){
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
      else{
        chatRooms = chatRooms.map((room) =>
          room.roomId === parsedMessage.payload.roomId
            ? {
                ...room,
                users: allSockets
                  .filter((user) => user.room === parsedMessage.payload.roomId)
                  .map((user) => ({
                    socket: user.socket,
                    room: user.room,
                    username: user.username,
                    avatarUrl: user.avatarUrl,
                  })),
              }
            : room
        );
      }

     

      const userInRoom = allSockets.filter((x) => x.room === parsedMessage.payload.roomId)

      // addUserAndRoom({username:parsedMessage.payload.username,avatarUrl:parsedMessage.payload.avatarUrl,roomId:parsedMessage.payload.roomId})

      userInRoom.forEach((x) => {
        x.socket.send(JSON.stringify({
          type:"join",
          payload:{
            usersAvailable : userInRoom.length,
            joined : chatRooms.find((y) => y.roomId === parsedMessage.payload.roomId)?.users || [],
            prevChats : chatRooms.find((y) => y.roomId === parsedMessage.payload.roomId)?.messages || [],
          }
        }))
      })

      // const userRoom = allSockets.find((x) => x.socket == socket)
      // const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
      // let usersInRoom = [];
      // currRoom.forEach((function(x){
      //   usersInRoom.push(x.username)
      //   x.socket.send(JSON.stringify(usersInRoom))
      // }))

      console.log('user in room',chatRooms.find((y) => y.roomId === parsedMessage.payload.roomId)?.users || [])
    }

    if(parsedMessage.type === "chat"){
      const userRoom = allSockets.find((x) => x.socket == socket)
      const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
      currRoom.forEach((function(x){
        x.socket.send(JSON.stringify({
          type:"chat",
          payload:parsedMessage.payload}))
      }))

      chatRooms.map((room) => {
        if(room.roomId === userRoom?.room){
          room.messages?.push({
            avatarUrl:parsedMessage.payload.avatarUrl,
            username:parsedMessage.payload.username,
            message:parsedMessage.payload.message
          })
        }
        
      })


      // addChat({username:parsedMessage.payload.username,message:parsedMessage.payload.message,roomId:parsedMessage.payload.roomId})

    }

    if(parsedMessage.type === "close"){
      const userRoom = allSockets.find((x) => x.socket == socket)
      const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
  
      currRoom.forEach((x) => {
        x.socket.send(JSON.stringify({
          type:"close",
          payload:`${userRoom?.username} has left the room`
        }))
      })
    }

    socket.on("close",()=>{
      const user = allSockets.find((x) => x.socket == socket)
      const temp = allSockets.filter((x) => x == user)
      allSockets = temp;

    })
    
    
  });
 
   
  console.log('Client connected');
})


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