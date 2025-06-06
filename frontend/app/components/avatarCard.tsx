"use client"

import { userStore } from "@/store/userStore";
import Image from "next/image";
import { useState } from "react";

export default function Card({url,title} : {url : string , title : string}){
    const [select , setSelect] = useState(false)
    const updateAvatar = userStore((state : any) => state.updateAvatarUrl)
    return (
<div className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] bg-slate-600 rounded-xl overflow-hidden" onClick={() =>{ setSelect(!select)
updateAvatar(url)
}} style={select ? {border: "2px solid yellow"} : {}}>
        <Image src={url} alt={title} width={100} height={100} className="hover:opacity-5" />
    </div>
)
}