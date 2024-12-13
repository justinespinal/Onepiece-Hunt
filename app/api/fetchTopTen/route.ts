import { NextResponse } from "next/server";
import { fetchTopTen } from "@/app/lib/data";

export async function POST(){
    
    const data = await fetchTopTen()

    return NextResponse.json({
        rows: data
    })
}