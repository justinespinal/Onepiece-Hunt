"use client"
import { Character } from "@/app/lib/definitions"
import Image from "next/image"
import Select from "./Select"
import Choices from "./Choices"
import { useState } from "react"
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
// import { refreshLeaderboard } from "@/app/lib/action"
import GuessCard from "./GuessCard"
import Link from "next/link"
import Winner from "./Winner"
import clsx from "clsx"
import Leaderboard from "./Leaderboard"

export default function HomeClient({characters, initialRandom}:{characters:Character[]|undefined, initialRandom:Character | undefined}) {
    const [choiceMade, setChoiceMade] = useState(false)
    const [guesses, setGuesses] = useState(0)
    const [won, setWinner] = useState(false)
    const [charactersGuessed, setGuessed] = useState<Character[]|undefined>([])
    const [random, setRandomCharacter] = useState<Character | undefined>(initialRandom)
    const [boardClicked, setBoardClicked] = useState(false)

    //error, isLoading
    const { user } = useUser();

    function LeaderboardClicked(){
        setBoardClicked(!boardClicked)
    }

    const reRollCharacter = async () => {
        try{
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

    const updateDB = async (guesses: number) => {
        try{
            const res = await fetch("/api/updateLeaderboard" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user?.email,
                    guesses: guesses
                }),
            });
    
            const result = await res.json()
            console.log(result)
        }catch(error){
            console.log(error)
        }
    }

    const checkCorrect = (character: Character) => {
        setChoiceMade(true)
        setGuessed([character].concat(charactersGuessed? charactersGuessed : []))
        if(character.id==random?.id) {
            setGuesses(guesses+1)
            setWinner(true)
            updateDB(guesses+1)
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
        <div className="flex flex-col justify-center items-center relative overflow-y-hidden h-[100vh]">
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
            <div id="leaderboad" className="justify-center items-center absolute z-50">
                {
                    boardClicked && 
                    <Leaderboard clickedLeaderboard={boardClicked} toggleLeaderboard={LeaderboardClicked}/>
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
            {/* <form action={refreshLeaderboard}>
                <button type="submit">Refresh Leaderboard</button>
            </form> */}
            <Image
                src="/assets/logo.png"
                width={500}
                height={500}
                alt="logo"
                className="transition-all hover:scale-110"
            />
            <div className="grid grid-cols-1 gap-3 items-center pb-3">
                <GuessCard attempts={guesses} user={user} LeaderboardClicked={LeaderboardClicked}/>
                <div className="">
                    <Select characters={characters} checkCorrect={checkCorrect} user={user} won={won}/>
                </div>
            </div>
            <div className="h-[40vh] max-w-[75vw] overflow-x-auto overflow-y-hidden p-4 lg:p-0">
                {choiceMade && 
                    <Choices characters={charactersGuessed} random={random}/>
                }
            </div>
        </div>
    )
}