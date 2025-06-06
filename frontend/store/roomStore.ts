import {create} from 'zustand'

export const roomStore = create((set) => ({
    roomId :"1234",
    
    updateRoomId : (newRoomId : string) => set((state : any) => ({roomId : newRoomId })),
 
}))