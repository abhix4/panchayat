"use client"
import Image from "next/image";
import Navbar from "../components/Nav";
import Card from "../components/avatarCard";
import { useState } from "react";

import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { roomStore } from "@/store/roomStore";


const profileAvatars = [
    {
        title:'avatar1',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791219/1_s7lovc.jpg"
    },
    {
        title:'avatar2',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791235/2_pegrm3.jpg"
    },
    {
        title:'avatar3',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791241/3_tu31zl.jpg"
    },
    {
        title:'avatar4',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791254/4_tjo3vq.jpg"
    },
    {
        title:'avatar5',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791260/5_svm2ed.jpg"
    },
    {
        title:'avatar6',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791268/6_o09wl7.jpg"
    },
    {
        title:'avatar7',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791276/7_sz7ya1.jpg"
    },
    {
        title:'avatar8',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791285/8_rvjewr.jpg"
    },
    {
        title:'avatar9',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791291/9_yom9c9.jpg"
    },
    {
        title:'avatar10',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791296/10_nhswjj.jpg"
    },
    {
        title:'avatar11',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791302/12_qwuo8m.jpg"
    },
    {
        title:'avatar12',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791304/13_sub0qw.jpg"
    },
    {
        title:'avatar13',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791309/15_qociu0.jpg"
    },
    {
        title:'avatar14',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791311/14_jmh1cl.jpg"
    },
    {
        title:'avatar15',
        url:"https://res.cloudinary.com/djn8q3ywh/image/upload/v1737791314/16_agqotz.jpg"
    },
]

export default function(){
    const updateUsername = userStore((state : any) => state.updateUsername)
    const username:string = userStore((state : any) => state.username)
    const avatar : string= userStore((state : any) => state.avatarUrl);
    const router = useRouter()
    const roomId = roomStore((state : any) => state.roomId)
   
    //console.log(username,avatar)
    // const [username , setUsername] = useState("JohnDoe46")

    // const [avatar , setAvatar] = useState("/assets/1.jpeg")
    return (<div className=" w-full bg-primaryColor md:h-screen p-4 pt-8">
        <Navbar/>
        <div className="md:w-[1200px]  w-full m-auto flex flex-col md:flex-row gap-6 mt-4  ">
           <div className="flex gap-3 flex-col">
           <h1 className="md:text-[24px] text-[16px] text-slate-400">Pick Avatar</h1>
             <div className='md:w-[690px] w-full md:h-[500px] bg-slate-700 rounded-xl p-3 overflow-y-scroll'>
                        <div className='flex flex-wrap gap-3' >
                            {                                
                                profileAvatars.map((x) =>  <Card url={x.url} title={x.title} key={x.title}/>)
                            }                   
                        </div>
                       </div>
           </div>
           <div className="flex gap-6 flex-col">
           <div className="flex flex-col gap-3">
           <h1 className="md:text-[24px] text-[16px] text-slate-400">Username</h1>
            <input 
                onChange={(e) => updateUsername(e.target.value)}
                type="text" 
                className="bg-slate-700 px-2 py-1 rounded-lg border-none outline-none text-[16px] md:h-[40px] text-slate-400" 
                onKeyDown={(e) => e.key === 'Enter' && router.push(`/chats/${roomId}`)}
            />
           </div>

            <div>
                <div className="flex gap-3 items-center">
                    <div className="w-[60px] h-[60px] bg-slate-600 rounded-full overflow-hidden">
                        <Image src={avatar} alt="profile" width={60} height={60} />
                    </div>
                    <div className="text-[18px] text-slate-400">
                       {username}
                    </div>
                </div>
            </div>
            <button className="bg-slate-700 md:px-4 py-2 px-2 text-[16px] text-center mb-10 rounded-lg text-slate-400 md:w-[120px] w-[80px] hover:bg-slate-600 hover:text-slate-300 ease-in-out transition-all duration-200"  onClick={() => 
            {router.push(`/chats/${roomId}`)
            // const socket = new WebSocket(`ws://localhost:3000/`);

            // socket.onopen = () => {
            //     console.log('WebSocket connection opened');        
            // }

            // socket.onerror = (error) => {
            //     console.error('WebSocket error:', error);
            // };
            }}>Save</button>
           </div>
        </div>
    </div>)
}


