import { Character } from "@/app/lib/definitions";
import Image from "next/image";
import "../globals.css"
import { clsx } from 'clsx';

export default function Choice({character, random}:{character: Character | undefined, random: Character | undefined}){
    const gender = character?.gender === random?.gender
    const affiliation = character?.affiliation === random?.affiliation
    const devilfruit = character?.devilfruit === random?.devilfruit
    const haki = new Set(character?.haki.split(", ")).intersection(new Set(random?.haki.split(", "))).size
    
    const height = character?.height === random?.height
    const origin = character?.origin === random?.origin
    return(
        <div className="grid grid-cols-9 gap-2 text-sm font-bold text-center">
            <div className="flex justify-center items-end transition-all hover:scale-105">
                <Image
                    src={`/assets${character?.imageurl}`}
                    width={100}
                    height={100}
                    alt="nami"
                    className="square-items"
                />
            </div>
            <div className={clsx(
                "flex justify-center square-items transition-all hover:scale-105",
                {
                    "correct": gender,
                    "incorrect": !gender
                }
            )}>
                {character?.gender}
            </div>
            <div className={clsx(
                "flex justify-center square-items transition-all hover:scale-105",
                {
                    "correct": affiliation,
                    "incorrect": !affiliation
                }
            )}>
                {character?.affiliation}
            </div>
            <div className={clsx(
                "flex justify-center square-items transition-all hover:scale-105",
                {
                    "correct": devilfruit,
                    "incorrect": !devilfruit
                }
            )}>
                {character?.devilfruit}
            </div>
            <div className={clsx(
                "flex justify-center square-items transition-all hover:scale-105",
                {
                    "correct": haki === Math.max(character?.haki.split(", ").length ||  0, random?.haki.split(", ").length || 0),
                    "incorrect": haki === 0,
                    "partial": haki < Math.max(character?.haki.split(", ").length ||  0, random?.haki.split(", ").length || 0)
                }
            )}>
                {character?.haki}
            </div>
            <div className="flex justify-center square-items transition-all hover:scale-105">{character?.lastbounty}</div>
            <div className="flex justify-center square-items transition-all hover:scale-105">{character?.height} cm</div>
            <div className={clsx(
                "flex justify-center square-items transition-all hover:scale-105",
                {
                    "correct": origin,
                    "incorrect": !origin
                }
            )}>
                {character?.origin}
            </div>
            <div className="flex justify-center square-items transition-all hover:scale-105">{character?.firstarc}</div>
        </div>
    )
}