"use client"
import { Character } from "@/app/lib/definitions"
import Image from "next/image"
import Select from "./Select"
import Choices from "./Choices"
import { useState } from "react"
import { useUser } from '@auth0/nextjs-auth0/client';
import { refreshCache } from "@/app/lib/action"
import GuessCard from "./GuessCard"


export default function HomeClient({characters, random}:{characters:Character[]|undefined, random:Character | undefined}) {
    const [choiceMade, setChoiceMade] = useState(false)
    const [charactersGuessed, setGuessed] = useState<Character[]|undefined>([])

    const { user, error, isLoading } = useUser();

    const checkCorrect = (character: Character) => {
        setChoiceMade(true)
        setGuessed([character].concat(charactersGuessed? charactersGuessed : []))
        console.log("in")
        if(character.id==random?.id)console.log("correct")
    }
    
    return (
        <div className="flex flex-col justify-center items-center p-10 relative">
                <h1 className="font-bold text-2xl text-[#584c44] bg-[#fffcf4] p-1 rounded">{user?.nickname}</h1>
                <a href="/api/auth/logout">Logout</a>
                <button onClick={refreshCache}>Refresh</button>
                <Image
                    src="/assets/logo.png"
                    width={500}
                    height={500}
                    alt="logo"
                    className="transition-all hover:scale-110"
                />
                <div className="flex flex-col gap-3 items-center">
                    <GuessCard/>
                    <div className="">
                        <Select characters={characters} checkCorrect={checkCorrect}/>
                    </div>
                    <div className="h-[60vh] overflow-x-auto md:overflow-x-hidden overflow-y-auto">
                        {choiceMade && 
                            <Choices characters={charactersGuessed} random={random}/>
                        }
                    </div>
                </div>
            </div>
    )
}