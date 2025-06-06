"use client";

import  {motion} from "framer-motion" 
import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { roomStore } from "@/store/roomStore";

const randomId = function(length = 6) {
    return Math.random().toString(36).substring(2, length+2);
};

export default function Landing(){
    const updateRoomId = roomStore((state : any) => state.updateRoomId)
    const [isvisible, setIsVisible] = useState(false)
    const [isJoinVisible, setIsJoinVisible] = useState(false)
    const [userRoom , setUserRoom] = useState("")
    const roomId = randomId() 
    const router = useRouter()


    return <div className="md:text-[54px] text-[24px] flex flex-col items-center justify-center text-center md:mt-48 mt-32 text-slate-50 gap-10 font-sans">
        <motion.div
        
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 , duration: 400 }}
            className="tracking-tighter"
          
        >
            {["Connect,", "Collaborate,", "Converse"].map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.5 }}
                >
                    {word}{" "}
                </motion.span>
            ))}
           <br />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            Your Chat Room, Reimagined.
        </motion.span>
        </motion.div>
        <div className="flex gap-4">
        <motion.div
            className="md:w-[200px] py-2 md:text-[22px] text-[16px] border border-slate-400 rounded-full shadow-lg cursor-pointer text-slate-300 tracking-tight px-4"
           
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            onClick={() => {
                setIsVisible(false)
                setIsJoinVisible(!isJoinVisible)}}
            
        >
          Join Room
        </motion.div>

        <motion.div
            className="md:w-[200px] py-2 md:text-[22px] text-[16px] border border-slate-400 rounded-full shadow-lg cursor-pointer text-slate-300 tracking-tight px-4"
           
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            onClick={() => {
                setIsJoinVisible(false)
                setIsVisible(!isvisible)}}
        >
            Create Room
        </motion.div>
        </div>
        {
            isvisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-300 md:text-[18px]  text-[16px] px-10 md:py-4 py-2 bg-slate-800 rounded-lg tracking-wider ease-in transition-all"
                >
                    Room Id : {roomId}
                </motion.div>
            )
        }


        {  
            isJoinVisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 1 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-300 md:text-[18px] text-[16px] md:px-10 py-4 px-4 bg-slate-800 rounded-lg tracking-wider flex flex-col gap-2 items-center justify-center"
                >
                   
                   <div className="gap-2 flex">
                   <input 
                        type="text" 
                        className="bg-slate-700 px-2 py-1 rounded-lg border-none outline-none md:text-[16px] text-[15px]" 
                        onChange={(e) => setUserRoom(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && router.push(`/chats`)}
                    />
                    <button className="bg-slate-900 px-4 py-1 text-[16px] text-center rounded-lg text-slate-300" onClick={() => {router.push('/chats')
                        updateRoomId(userRoom)
                    }}>Join</button>
                   
                   </div>
                   <div className="text-[14px] text-slate-600">
                        please enter your room id
                    </div>
                </motion.div>
                
            )
        }
    </div>
}