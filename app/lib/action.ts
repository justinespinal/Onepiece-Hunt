"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { sql } from "@vercel/postgres";


export async function refreshCache(){
  revalidatePath("/")
  redirect("/")
}

export async function updateLeaderboard(user: string | null | undefined, guesses: number){
  const leaderboard = await sql`
    SELECT * FROM leaderboard
    WHERE leaderboard.email = ${user}
  `
  try{
    if(leaderboard.rows.length == 0){
      await sql`BEGIN`;
      await sql`
          INSERT INTO leaderboard (email, score)
          VALUES (${user}, ${guesses})
          ON CONFLICT (email) DO NOTHING;
          `;
      await sql`COMMIT`;
      return true
    }else if(leaderboard.rows[0].score > guesses){
      await sql`BEGIN`;
      await sql`
          UPDATE leaderboard
          SET score = ${guesses}
          WHERE id = ${leaderboard.rows[0].id}
          `;
      await sql`COMMIT`;
      return true
    }else{
      return false
    }
  }catch(error){
    console.log(error)
    await sql`ROLLBACK`
    return false
  }
}

export async function refreshLeaderboard(){
  try{
    await sql`BEGIN`;
    await sql`
      TRUNCATE leaderboard;
    `
    await sql`COMMIT`
    //return true
  }catch(error){
    console.log(error)
    await sql`ROLLBACK`
    //return false
  }
}