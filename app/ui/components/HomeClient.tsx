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

export default function HomeClient({characters, random}:{characters:Character[]|undefined, random:Character | undefined}) {
    const [choiceMade, setChoiceMade] = useState(false)
    const [guesses, setGuesses] = useState(0)
    const [won, setWinner] = useState(false)
    const [charactersGuessed, setGuessed] = useState<Character[]|undefined>([])

    //error, isLoading
    const { user } = useUser();
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

    // const resetGame = () => {
    //     setWinner(false)
    //     setGuesses(0)
    //     setGuessed([])
    // }
    
    return (
        <div className="flex flex-col justify-center items-center relative">
            <div className={clsx(
                "justify-center items-center h-[100vh] w-[100vw] z-50",
                {
                    "flex": won,
                    "hidden": !won
                }
                )}>
                <Winner character={random} guesses={guesses}/>
            </div>
            <Link href="/profile" className="ml-auto mt-10 mr-10 w-[3em]">
                <img src={userPicture(user)} className={clsx("rounded-full", {
                    "hidden": !user
                }
                )} alt="user profile image"></img>
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
            <div className="flex flex-col gap-3 items-center">
                <GuessCard attempts={guesses} user={user}/>
                <div>
                    <Select characters={characters} checkCorrect={checkCorrect} user={user}/>
                </div>
                <div className="h-[40vh] overflow-x-auto md:overflow-x-hidden">
                    {choiceMade && 
                        <Choices characters={charactersGuessed} random={random}/>
                    }
                </div>
            </div>
        </div>
    )
}