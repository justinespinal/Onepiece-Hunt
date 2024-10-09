import { fetchRandomCharacter } from "../../lib/data";
import { NextResponse } from "next/server";
export async function GET(){
    console.log("in")
    try{
        const randomCharacter = await fetchRandomCharacter()
        return NextResponse.json(randomCharacter);
    }catch (error){
        return NextResponse.json({error: `Failed to fetch random character :( ${error}`});
    }
}