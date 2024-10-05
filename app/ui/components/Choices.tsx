import { Character } from "@/app/lib/definitions";

export default function Choices({characters}:{characters:Character[] | null}){
    return(
        <div>
            {characters?.map((character) => (

                <div></div>
            ))}
        </div>
    )
}