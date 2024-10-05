"use client"
import { Character } from "@/app/lib/definitions"
import Image from "next/image"
import Select from "./Select"

export default function HomeClient({characters, random}:{characters:Character[]|undefined, random:Character | undefined}) {
    let choiceMade = false
    
    const checkCorrect = (character: Character) => {
        choiceMade = true
        console.log("in")
        if(character.id==random?.id)console.log("correct")
    }
    
    return (
        <div className="flex flex-col justify-center items-center p-10 relative">
                <a href="/api/auth/logout">Logout</a>
                <Image
                    src="/assets/logo.png"
                    width={500}
                    height={500}
                    alt="logo"
                    className="transition-all hover:scale-110"
                />
                <div className="flex flex-col gap-3">
                    <div className="bg-white rounded-md w-[75vw]">
                        <Select characters={characters} checkCorrect={checkCorrect}/>
                    </div>
                    <div className="bg-red-500 rounded-md w-full h-[60vh]">
                        {random?.name}
                    </div>
                </div>
            </div>
    )
}