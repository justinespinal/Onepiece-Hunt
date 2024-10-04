"use server"

import { sql } from "@vercel/postgres"

import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
})

export async function addUser(formData: FormData){
    const { username, email, password } = FormSchema.parse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    })
    const hashedPassword = await bcrypt.hash(password, 15);
    await sql`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${email}, ${hashedPassword})
        ON CONFLICT (username) DO NOTHING
    `
    revalidatePath("/create")
    redirect("/login")
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }