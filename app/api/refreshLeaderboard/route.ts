import { refreshLeaderboard } from "@/app/lib/action";

export const runtime = 'edge'

export async function GET(){
    try{
        const response = await refreshLeaderboard()
    
        if (response.success) {
            return Response.json(response)
        } else {
            return Response.json(response, { status: 500 })
        }
    } catch (error) {
        console.error('Refresh Leaderboard Error:', error);
        return Response.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}