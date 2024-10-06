import { sql } from "@vercel/postgres";
import { Character } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchCharacters(){
    try{
        const characters = await sql<Character>`
            SELECT * FROM character
        `
        return characters.rows
    }catch(error){
        console.log(error)
    }
}

export async function fetchRandomCharacter(){
    try{
        const characters = await sql<Character>`
        SELECT * FROM character
        `
        return characters.rows[Math.floor(Math.random() * (characters.rows.length-1))]
    }catch(error){
        console.log(error)
    }
}