import { NextResponse } from "next/server";
import { refreshLeaderboard } from "@/app/lib/action";

export async function GET(request: Request){

    const response = await refreshLeaderboard()

    return Response.json({
        message: response
    })
}