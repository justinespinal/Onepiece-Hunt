import { Character } from "@/app/lib/definitions";
import Image from "next/image";
import "../globals.css"
import { clsx } from 'clsx';

import ValueCard from "./ValueCard";
import { useEffect, useState } from "react";

export default function Choice({character, random}:{character: Character | undefined, random: Character | undefined}){
    const gender = character?.gender === random?.gender
    const affiliation = character?.affiliation === random?.affiliation
    const devilfruit = character?.devilfruit === random?.devilfruit
    const haki = new Set(character?.haki.split(", ")).intersection(new Set(random?.haki.split(", "))).size
    const origin = character?.origin === random?.origin
    const [arcResult, setArcResult] = useState<string>("")


    const getArcResult = async (guessedArc: string | undefined, correctArc: string | undefined) => {
        if(!guessedArc || !correctArc){
            return ""
        }
        const response = await fetch("/api/checkArcOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                guessedArc: guessedArc,
                correctArc: correctArc
            })
        })

        const result = await response.json()
        return result.message
    }
    const convertBounty = (bounty: number | undefined) => {
        if(!bounty){
            return ""
        }
        const stringBounty = bounty.toString()
        if(stringBounty.length >= 10){
            return `${stringBounty?.charAt(0)}.${stringBounty?.charAt(1)} B`
        }else if(stringBounty.length>=9){
            return `${stringBounty?.charAt(0)}.${stringBounty?.charAt(1)} M`
        }else{
            return bounty.toString()
        }
    }

    const checkHeight = (height: number | undefined, randomHeight: number | undefined) => {
        if(!height || !randomHeight){
            return ""
        }
        if(height === randomHeight)
            return "correct"
        else if(height < randomHeight)
            return "higher"
        else return "lower"
    }

    const checkBounty = (bounty: number | undefined, randomBounty: number | undefined) => {
        if(!bounty || !randomBounty){
            return ""
        }
        if(bounty === randomBounty)
            return "correct"
        else if(bounty < randomBounty)
            return "higher"
        else return "lower"
    }

    useEffect(() => {
        const fetchArcResult = async () => {
            const result = await getArcResult(character?.firstarc, random?.firstarc)
            setArcResult(result)
        };

        if(character?.firstarc && random?.firstarc){
            fetchArcResult()
        }
    }, [character?.firstarc, random?.firstarc])

    return(
        <div className="grid grid-cols-9 gap-2 text-xs md:text-sm font-bold text-center">
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
                    "partial": haki < Math.max(character?.haki.split(", ").length ||  0, random?.haki.split(", ").length || 0) && haki > 0
                }
            )}>
                {character?.haki}
            </div>
            <div className="flex justify-center square-items transition-all hover:scale-105">
                <ValueCard value={checkBounty(character?.lastbounty, random?.lastbounty)} stringFormat={convertBounty(character?.lastbounty)}/>
            </div>
            <div className="flex justify-center square-items transition-all hover:scale-105">
                <ValueCard value={checkHeight(character?.height, random?.height)} stringFormat={`${character?.height} cm`}/>
            </div>
            <div className={clsx(
                "flex justify-center square-items transition-all hover:scale-105",
                {
                    "correct": origin,
                    "incorrect": !origin
                }
            )}>
                {character?.origin}
            </div>
            <div className="flex justify-center square-items transition-all hover:scale-105">
                <ValueCard value={arcResult} stringFormat={character?.firstarc} />
            </div>
        </div>
    )
}