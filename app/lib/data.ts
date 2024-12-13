import { sql } from "@vercel/postgres";
import { Character } from "@/app/lib/definitions";

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

export async function fetchArcOrder({name}:{name:string | undefined}){
    try{
        const result = await sql`
            SELECT arc_order FROM arcs
            WHERE arcs.name = ${name}
        `
        return result.rows[0].arc_order
    }catch(error){
        console.log(error)
    }
}

export async function fetchTopTen(){
    try{
        const result = await sql`
            SELECT * FROM leaderboard
            ORDER BY score ASC;
        `

        return result.rows
    }catch(error){
        console.log(error)
    }
}