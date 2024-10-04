
import { db } from "@vercel/postgres";
import { sql } from "@vercel/postgres";

const client = await db.connect();

async function createUsers() {
    console.log("test")
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(25) NOT NULL UNIQUE PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `;
    console.log("done test")
}

export async function GET(){
    try{
        await client.sql`BEGIN`;
        await createUsers();
        await client.sql`COMMIT`;
        return Response.json({ message: "Tables created successfully"});
    }catch(error){
        await client.sql`ROLLBACK`
        return Response.json({ error }, { status: 500 });
    }
}