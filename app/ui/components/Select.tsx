"use client"
import { Character } from "@/app/lib/definitions";
import { useState, useEffect } from "react";
import SelectItem from "./SelectItem";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export default function Select({characters, checkCorrect, user, won}:{characters:Character[] | undefined, checkCorrect: (character: Character) => void, user: UserProfile | undefined, won: boolean}){
    let value = "z"
    const [filtered, setFiltered] = useState<Character[]|undefined>([])
    const [guessed, setGuessed] = useState<Set<string> | undefined>(new Set())
    console.log(characters)

    function updateValue(target:string){
        value = target
        if(value.trim()=="") setFiltered([])
        else setFiltered(characters?.filter((character:Character) => character.name.toLowerCase().includes(value.toLowerCase()) && !guessed?.has(character.id)))
    }

    async function choiceMade(character: Character){
        setFiltered([])
        setGuessed(guessed?.add(character.id))
        checkCorrect(character)
    }

    useEffect(() => {
        if(won){
            setGuessed(new Set())
        }
    }, [won]);

    return (
        <div className="relative">
            <div className="bg-[#fffcf4] border-[3px] border-[#584c44] rounded-md p-5 w-full">
                {user && 
                    <input onChange={(e) => {updateValue(e.target.value)}}  placeholder="Character name..." className="w-full p-2 placeholder:text-black text-black bg-transparent border-[3px] rounded border-[#ece4c4]"></input>
                }
                {!user &&
                    <input placeholder="Sign in to play" disabled className="w-full p-2 placeholder:text-slate-500 text-black bg-transparent border-[3px] rounded border-[#ece4c4]"></input>
                }
            </div>
            <div className="max-h-[20vh] w-full rounded bg-[#fffcf4] overflow-y-auto absolute">
                {filtered?.map((character) => (
                    <div onClick={async () => {await choiceMade(character)}} key={character.id} className="text-black bg-blue hover:bg-blue-400">
                        <SelectItem name={character.name} imageurl={character.imageurl} />
                    </div>
                ))}
            </div>
        </div>
    )
}