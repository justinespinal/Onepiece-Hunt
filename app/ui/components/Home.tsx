import { fetchCharacters, fetchRandomCharacter } from "@/app/lib/data"
import HomeClient from "./HomeClient"

export default async function Home() {

    const characters = await fetchCharacters()
    const random = await fetchRandomCharacter()

    return(
        <div className="overflow-y-hidden main">
            <HomeClient characters={characters} initialRandom={random}/>
        </div>
    )
}