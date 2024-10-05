"use client"
import { Character } from "@/app/lib/definitions";
import { useState } from "react";
import SelectItem from "./SelectItem";
export default function Select({characters, checkCorrect}:{characters:Character[] | undefined, checkCorrect: Function}){
    let value = "z"
    const [filtered, setFiltered] = useState<Character[]|undefined>([])
    function updateValue(target:string){
        value = target
        if(value.trim()=="")setFiltered([])
        else setFiltered(characters?.filter((character:Character) => character.name.toLowerCase().includes(value)))
    }

    async function choiceMade(character: Character){
        setFiltered([])
        checkCorrect(character)
    }

    return (
        <div>
            <form className="">
                <input onChange={(e) => {updateValue(e.target.value)}}  placeholder="Character name..." className="w-full p-5 placeholder:text-black text-black"></input>
                <div className="overflow-y-auto max-h-[20vh]">
                    {filtered?.map((character) => (
                        <div onClick={async () => {await choiceMade(character)}} key={character.id} className="text-black bg-blue hover:bg-blue-400"><SelectItem id={character.id} name={character.name} imageurl={character.imageUrl} /></div>
                    ))}
                </div>
            </form>
        </div>
    )
}