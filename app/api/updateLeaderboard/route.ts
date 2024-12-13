import { NextResponse } from "next/server";
import { updateLeaderboard } from "@/app/lib/action";

export async function POST(request: Request){
    console.log("in update")
    const {user, guesses} = await request.json();
    console.log("got data")
    const updateLeaderboardResponse = await updateLeaderboard(user, guesses)

    return NextResponse.json({
        message: updateLeaderboardResponse
    })
}