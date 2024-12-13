import { refreshLeaderboard } from "@/app/lib/action";

export async function GET(){

    const response = await refreshLeaderboard()

    return Response.json({
        message: response
    })
}