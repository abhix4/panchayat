"use client";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Navbar from '@/app/components/Nav';
import Chat from '@/app/components/chat';
import UserChat from '@/app/components/userchat';
import { IoSendSharp } from "react-icons/io5";
import { PiSmileyStickerFill } from "react-icons/pi";
import EmojiPicker from 'emoji-picker-react';
import { roomStore } from '@/store/roomStore';
import { userStore } from '@/store/userStore';

type User = {
    socket : WebSocket ;
    room : string ;
    username:string;
    avatarUrl:string;
}

export default function Page() {
    let i = 0;
    const roomId = roomStore((state : any) => state.roomId) 
    const username = userStore((state : any) => state.username) 
    const avatar = userStore((state:any) => state.avatarUrl)

    const [socket,setSocket] = useState<any>(null)
  //  const [newMessage,setNewMessage] = useState("")
    const [messages,setMessages] = useState<any []>([])
  //  const [myMessages,setMyMessages] = useState<any []>([])
    const [usersInRoom , setUsersInRoom] = useState<User[]>([])
    const [inRoom , setInRoom] = useState<number>(0)
    
    const[isOpen,setIsOpen] = useState(false)
    const[text,setText] = useState("")
    const theme = "dark"
    
    useEffect(() => {

        const socket = new WebSocket(`wss://panchayat-qf5o.onrender.com`);

        socket.onopen = () => {
            console.log('WebSocket connection opened');     
            socket.send(JSON.stringify({
                type:"join",
                payload:{
                    roomId,
                    username,
                    avatarUrl : avatar
                }
            }))   
            
        };

        socket.onmessage = (event ) => {
            const data = JSON.parse(event.data)
            // console.log(data)

            if(data.type === "chat"){
                setMessages((prevMessages) => [...prevMessages, data.payload])

            }
            else if(data.type === "join"){
                setUsersInRoom((prev) => [...data.payload.joined])
                setInRoom(data.payload.usersAvailable)
                setMessages((prev) => [...data.payload.prevChats])
            }
            else if(data.type === "close"){
                setUsersInRoom((prev) => [...prev,data.payload])
            }

            console.log(messages)
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            socket.send(JSON.stringify({
                type:"close",
                payload:{
                    roomId,
                    username,
                    avatarUrl : avatar
                }
            }))   
        };

        socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        };
        setSocket(socket)
        return () => {
            socket.close();
        };
    }, []);

    function handleSubmit(){
        socket.send(JSON.stringify({
            type:"chat",
            payload:{
                roomId,
                message:text,
                username,
                avatarUrl:avatar
            }
        }))  
    }

    
    return (
        <div className='w-full bg-primaryColor md:h-screen pt-8 px-4'>
        <Navbar/>
        <div className=' max-w-[1200px] m-auto font-sans mt-10'>
           <div className='flex justify-between'>
           <h1 className='text-slate-300 font-semibold md:text-[24px] text-[18px] tracking-wide'>Room <span className='font-thin'>#{roomId}</span></h1>
            <div className='text-slate-300 md:text-[20px] text-[16px] tracking-wide md:hidden'>In room : {inRoom}</div>
           </div>
           <div className='mt-2 flex md:flex-row flex-col gap-2'>
           <div className=' w-full md:w-[700px] h-[500px] bg-slate-700 rounded-xl p-3 overflow-y-scroll'>
            <div className='flex flex-col gap-2'>
                { 
                
                messages.length === 0 ? <div className='text-slate-400 text-[16px] text-center py-10'>No messages yet</div> :
                    messages.map((x) => {
                        if(x.username !== username) return <Chat key={i++} avatar={x.avatarUrl} username={x.username} message={x.message}  />
                        else return  <UserChat key={i++} message={x.message} avatar={x.avatarUrl} />
                    })
                }
           

            </div>
           </div>
          

           <div className='md:w-[450px] md:h-[500px]  bg-slate-900 rounded-lg flex md:flex-col flex-col-reverse justify-between p-2 '>
            {/* <div className='px-4'>
                <h1 className='text-[20px] text-slate-500'>Joined</h1>
                <div className='flex flex-col gap-2'>
                <div className='text-[16px] text-slate-500'>abhiifour</div>
                </div>
               
            </div> */}
            <div className='py-2 h-[300px] overflow-hidden overflow-y-scroll'>
            {
                usersInRoom.length === 0 ? <div className='text-slate-400 text-[16px]'>No users in room</div> :
                usersInRoom.map((x:User) => <div key={x.username} className='text-slate-400 text-[16px] px-2'>{x.username} has joined the room</div>)
            }
            </div>
           
            <div className='py-4 '>
            <EmojiPicker open={isOpen} height={400} width={435} onEmojiClick={(e)=> setText((state)=> state + e.emoji)}/>
            </div>
           <div className="gap-2 flex py-1">
                    <textarea name="message" id="message"  className="bg-slate-700 px-2 py-3 rounded-lg border-none outline-none text-[15px] w-[85%] text-slate-400" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <div className='text-slate-500 text-[32px] flex items-center' onClick={() => setIsOpen(!isOpen)}>
                    <PiSmileyStickerFill />
                    </div>
                    <button className="bg-slate-700 px-4 py-1 text-[16px] text-center rounded-full text-slate-300" onClick={() =>{
                        handleSubmit()
                        setText("")
                    }}><IoSendSharp /></button>
                   
                   </div>
                   
           </div>

           </div>
           
                {/* <div>
                    <h1>MY MESSAGES</h1>
                    {
                        myMessages.map(item => <div key={item}>{item}</div>)
                    }
                </div>
                <div>
                    <h1>OTHERS MESSAGES</h1>
                    {
                        messages.map(item => <div key={item}>{item}</div>)
                    }
                </div> */}
                
                
          
        </div>
        </div>
    )
}
