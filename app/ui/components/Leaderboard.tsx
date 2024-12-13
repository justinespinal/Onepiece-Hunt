import { User } from "@/app/lib/definitions"
import { useEffect, useState } from "react";
import "../globals.css"
export default function Leaderboard({clickedLeaderboard, toggleLeaderboard}:{clickedLeaderboard:boolean, toggleLeaderboard: () => void}) {

    const [topTen, setTopTen] = useState<User[]|undefined>([])

    const getTopTen = async () => {
        try{
            const response = await fetch("/api/fetchTopTen", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json()
            console.log(data.rows[0])
            return data.rows
        }catch(error){
            console.log(error)
            return []
        }
    }

    useEffect(() => {
        console.log("clicked:" + clickedLeaderboard)
        if(clickedLeaderboard){
            const top = async () => {
                const result = await getTopTen()
                setTopTen(result)
            };
            top()
        }
    }, [clickedLeaderboard])
    return (
        <div className="text-[#584c44] bg-gray-500/75 transition-opacity -z-50 h-[100vh] w-[100vw] fadeInAnimation">
            <span onClick={toggleLeaderboard}>Close</span>
            <div className="flex justify-center items-center h-full">
            {
                clickedLeaderboard &&
                <div className="bg-[#ece4c4] p-[8px] rounded border-[2px] border-[#584c44] flex flex-col w-[75%] md:w-[50%] h-[50%]">
                    <span className="font-extrabold text-3xl text-center">Leaderboard</span>
                    <div className="border-[2px] border-[#584c44] bg-[#fffcf4] h-full pl-10 pt-5 font-semibold text-lg md:text-3xl">
                        <ol className="list-decimal">
                            {(topTen?.map((user) => (
                                    <li>{user.email.split('@')[0]}:    {user.score}</li>
                            )))}
                        </ol>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}