import {create} from 'zustand'

export const userStore = create((set) => ({
    avatarUrl :"/assets/1.jpeg",
    username: "johndoe",
    updateUsername : (newUsername : string) => set((state : any) => ({username : newUsername })),
    updateAvatarUrl : (newUrl : string) => set((state : any) => ({avatarUrl : newUrl }))
}))