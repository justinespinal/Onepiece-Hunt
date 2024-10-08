"use client"
import { Character } from "@/app/lib/definitions";
import { useState } from "react";
import SelectItem from "./SelectItem";
export default function Select({characters, checkCorrect}:{characters:Character[] | undefined, checkCorrect: (character: Character) => void}){
    let value = "z"
    const [filtered, setFiltered] = useState<Character[]|undefined>([])
    const [guessed, setGuessed] = useState<Set<string> | undefined>(new Set())
    
    function updateValue(target:string){
        value = target
        if(value.trim()=="") setFiltered([])
        else setFiltered(characters?.filter((character:Character) => character.name.toLowerCase().includes(value) && !guessed?.has(character.id)))
    }

    async function choiceMade(character: Character){
        setFiltered([])
        setGuessed(guessed?.add(character.id))
        checkCorrect(character)
    }

    return (
        <div className="w-[25vw]">
            <div className="bg-[#fffcf4] border-[3px] border-[#584c44] rounded-md p-5">
                <input onChange={(e) => {updateValue(e.target.value)}}  placeholder="Character name..." className="w-full p-2 placeholder:text-black text-black bg-transparent border-[3px] rounded border-[#ece4c4]"></input>
            </div>
            <div className="max-h-[20vh] rounded bg-[#fffcf4] overflow-y-auto">
                {filtered?.map((character) => (
                    <div onClick={async () => {await choiceMade(character)}} key={character.id} className="text-black bg-blue hover:bg-blue-400">
                        <SelectItem name={character.name} imageurl={character.imageurl} />
                    </div>
                ))}
            </div>
        </div>
    )
}