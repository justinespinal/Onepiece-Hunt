import { NextResponse } from "next/server";
import { fetchArcOrder } from "@/app/lib/data";

export async function POST(request: Request){
    const {guessedArc, correctArc} = await request.json();
    const guessedOrder = await fetchArcOrder({ name: guessedArc })
    const correctOrder = await fetchArcOrder({ name: correctArc })
    let response = "correct"
    if(!guessedOrder || !correctOrder){
        return
    }
    if(guessedOrder < correctOrder)
        response = "higher"
    else if(guessedOrder > correctOrder) 
        response = "lower"
    else
        response = "correct"
    return NextResponse.json({
        message: response
    })
}