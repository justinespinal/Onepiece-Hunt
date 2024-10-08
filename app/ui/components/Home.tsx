import Image from "next/image"
import bg from "../../../public/assets/background-3.jpg"
import { fetchCharacters, fetchRandomCharacter } from "@/app/lib/data"
import HomeClient from "./HomeClient"

export default async function Home() {

    const characters = await fetchCharacters()
    const random = await fetchRandomCharacter()

    console.log(random)
    return(
        <div className="h-[100vh] w-full overflow-y-hidden">
            <span className="absolute">
                <Image
                    src={bg}
                    height={1000}
                    width={1000}
                    alt="bg"
                    className="h-[100vh] w-[100vw]"
                />
            </span>
            <HomeClient characters={characters} random={random}/>
        </div>
    )
}