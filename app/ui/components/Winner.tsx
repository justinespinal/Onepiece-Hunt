import { Character } from "@/app/lib/definitions";

import Image from "next/image";

export default function Winner({character, guesses}:{character: Character | undefined, guesses: number}){
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-3xl backdrop-opacity-50">
            <div className="border-[4px] border-[#584c44] bg-[#fffcf4] text-[#584c44] p-10 rounded-2xl flex flex-col gap-10 items-center justify-center h-[75vh] w-[50vw]">
                <Image
                    src={"/assets"+character?.imageurl}
                    width={500}
                    height={500}
                    alt="image"
                    className="rounded-2xl"
                />
                <div className="text-center">
                    <h1 className="font-bold text-xl">Correct! It is {character?.name}</h1>
                    <h2>You guessed correctly in {guesses} attempts!</h2>
                    <a href="/">
                        Try again?
                    </a>
                </div>
            </div>
        </div>
    )
}