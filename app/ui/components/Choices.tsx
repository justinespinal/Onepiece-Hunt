import { Character } from "@/app/lib/definitions";
import { useEffect } from "react";
import "../globals.css"
import Choice from "./Choice";

export default function Choices({characters, random}:{characters:Character[] | undefined, random: Character | undefined}){
    
    return(
        <div className="flex flex-col items-center overflow-x-auto md:overflow-x-hidden m-2">
            <div className="grid grid-cols-9 gap-2 text-sm text-center font-bold text-[#584c44] h-20">
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">CHARACTER</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">GENDER</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">AFFILIATION</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">DEVIL FRUIT</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">HAKI</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">LAST BOUNTY</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">HEIGHT</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">ORIGIN</h1>
                <h1 className="flex justify-center items-end square-items border-b-4 border-[#584c44]">FIRST ARC</h1>
            </div>
            <div className="overflow-y-auto max-h-[40vh]">
                {characters?.map((character) => (
                    <Choice character={character} random={random}/>
                ))}
            </div>
        </div>
    )
}