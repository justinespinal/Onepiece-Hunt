"use client"
import { Character } from "@/app/lib/definitions"
import Image from "next/image"
import Select from "./Select"
import Choices from "./Choices"
import { useState } from "react"
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
// import { refreshCache } from "@/app/lib/action"
import GuessCard from "./GuessCard"
import Link from "next/link"
import Winner from "./Winner"
import clsx from "clsx"

export default function HomeClient({characters, initialRandom}:{characters:Character[]|undefined, initialRandom:Character | undefined}) {
    const [choiceMade, setChoiceMade] = useState(false)
    const [guesses, setGuesses] = useState(0)
    const [won, setWinner] = useState(false)
    const [charactersGuessed, setGuessed] = useState<Character[]|undefined>([])
    const [random, setRandomCharacter] = useState<Character | undefined>(initialRandom)
    
    //error, isLoading
    const { user } = useUser();

    const reRollCharacter = async () => {
        try{
            console.log("in home client")
            const data = await fetch("/api/fetchRandomCharacter")
            const response = await data.json()
            const newRandomCharacter: Character = {
                id: response.id,
                name: response.name,
                gender: response.gender,
                affiliation: response.affiliation,
                devilfruit: response.devilfruit,
                haki: response.haki,
                lastbounty: response.lastbounty,
                height: response.height,
                firstarc: response.firstarc,
                origin: response.origin,
                imageurl: response.imageurl
            }
            setRandomCharacter(newRandomCharacter)
        }catch (error){
            console.log(error)
        }
    }

    const userPicture = (user: UserProfile | undefined) => {
        if(!user){
            return "/"
        }
        return user.picture as string
    }

    const checkCorrect = (character: Character) => {
        setChoiceMade(true)
        setGuessed([character].concat(charactersGuessed? charactersGuessed : []))
        console.log("in")
        if(character.id==random?.id) {
            setGuesses(guesses+1)
            setWinner(true)
        }
        else setGuesses(guesses+1)
    }

    const resetGame = () => {
        setWinner(false)
        setGuesses(0)
        setGuessed([])
        setChoiceMade(false)
    }
    
    return (
        <div className="flex flex-col justify-center items-center relative overflow-y-hidden">
            <div className={clsx(
                "justify-center items-center absolute z-50",
                {
                    "flex": won,
                    "hidden": !won
                }
                )}>
                {won && 
                    <Winner character={random} guesses={guesses} resetGame={resetGame} reRollCharacter={reRollCharacter}/>
                }
            </div>
            <Link href="/profile" className="ml-auto mt-10 mr-10 w-[3em]">
                {user && (
                    <Image
                    src={userPicture(user)}
                    width={48}
                    height={48}
                    className="rounded-full"
                    alt="user profile image"
                    />
                )}
            </Link>
            <a href="/api/auth/logout">{user ? "Logout" : ""}</a>
            {/* <button onClick={refreshCache}>Refresh</button> */}
            <Image
                src="/assets/logo.png"
                width={500}
                height={500}
                alt="logo"
                className="transition-all hover:scale-110"
            />
            <div className="grid grid-cols-1 gap-3 items-center pb-3">
                <GuessCard attempts={guesses} user={user}/>
                <div className="">
                    <Select characters={characters} checkCorrect={checkCorrect} user={user} won={won}/>
                </div>
            </div>
            <div className="h-[40vh] max-w-[75vw] overflow-x-auto p-4 lg:p-0">
                {choiceMade && 
                    <Choices characters={charactersGuessed} random={random}/>
                }
            </div>
        </div>
    )
}