"use server"

import { sql } from "@vercel/postgres"

import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { AuthError } from 'next-auth';

const FormSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
})

export async function refreshCache(){
  revalidatePath("/")
  redirect("/")
}
