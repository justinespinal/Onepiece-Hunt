import { Character } from "@/app/lib/definitions";
import "../globals.css"
import Choice from "./Choice";

export default function Choices({characters, random}:{characters:Character[] | undefined, random: Character | undefined}){
    
    return(
        <div className="flex flex-col items-center overflow-x-auto overflow-y-hidden md:overflow-x-hidden">
            <div className="grid grid-cols-9 gap-2 text-sm text-center font-bold text-[#584c44] h-20">
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">CHARACTER</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">GENDER</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">AFFILIATION</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">DEVIL FRUIT</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">HAKI</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">LAST BOUNTY</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">HEIGHT</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">ORIGIN</h1>
                <h1 className="flex justify-center items-end square-items border-[2px] border-[#584c44] bg-[#fffcf4]">FIRST ARC</h1>
            </div>
            <div className="max-h-[40vh]">
                {characters?.map((character) => (
                    <Choice character={character} random={random} key={character.id}/>
                ))}
            </div>
        </div>
    )
}