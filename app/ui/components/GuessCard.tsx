import bottomLeft from "@/public/assets/bottom-left.png"
import topRight from "@/public/assets/top-right.png"

import Image from "next/image"

import "../styles/GuessCard.css"
import { UserProfile } from "@auth0/nextjs-auth0/client"

export default function GuessCard({attempts, user}:{attempts: number, user: UserProfile | undefined}) {
    console.log(typeof user)
    return (
        <div className="bg-[#ece4c4] p-[6px] rounded border-[2px] border-[#584c44] relative">
            <Image
                src={topRight}
                width={28}
                height={28}
                alt="topRight corner guess card"
                className="absolute top-[-0.45rem] right-[-0.35rem]"
            />
            <div className="font-bold border-[2px] border-[#584c44] bg-[#fffcf4] rounded p-10 text-center">
                <h1 className="text-[#584c44]">GUESS THE ONE PIECE CHARACTER</h1>
                {
                    !user &&
                    <a href="/api/auth/login" className="text-slate-400">Sign up or Log in to play!</a>
                }
                {
                    attempts===0 && user &&
                    <h3 className="text-slate-400">Type any character to begin</h3>
                }
                {attempts!=0 && user &&
                    <h3 className="text-slate-400">Attempts made: {attempts}</h3>
                }
            </div>
            <Image
                src={bottomLeft}
                width={28}
                height={28}
                alt="bottom left corner guess card"
                className="absolute top-[7.7rem] right-[22.75rem]"
            />
        </div>
    )
}