
import { db } from "@vercel/postgres";
import { sql } from "@vercel/postgres";
import { characters } from "../lib/placeholder-data";

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

async function createCharacters() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS character (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE,
            gender VARCHAR(25) NOT NULL,
            affiliation VARCHAR(50) NOT NULL,
            devilFruit VARCHAR(15) NOT NULL,
            haki VARCHAR(35) NOT NULL,
            lastBounty BIGINT NOT NULL,
            height INT NOT NULL,
            origin VARCHAR(50) NOT NULL,
            firstArc VARCHAR(50) NOT NULL,
            imageUrl VARCHAR(100) NOT NULL
        )
    `
}

async function seedCharacters() {
    
    const insertedCharacter = await Promise.all(
        characters.map(async (character) => {
        return client.sql`
        INSERT INTO character (name, gender, affiliation, devilfruit, haki, lastbounty, height, origin, firstarc, imageurl)
        VALUES (${character.name}, ${character.gender}, ${character.affiliation}, ${character.devilFruit}, ${character.haki}, ${character.lastBounty}, ${character.height}, ${character.origin}, ${character.firstArc}, ${character.imageUrl})
        ON CONFLICT (id) DO NOTHING;
        `;
      }),
    )

    return insertedCharacter
}

export async function GET(){
    try{
        await client.sql`BEGIN`;
        //await seedCharacters();
        await client.sql`COMMIT`;
        return Response.json({ message: "Tables seeded successfully"});
    }catch(error){
        await client.sql`ROLLBACK`
        return Response.json({ error }, { status: 500 });
    }
}