"use server"

import Image from "next/image"
import bg from "../public/assets/background.jpg"
import { getSession } from '@auth0/nextjs-auth0';
import Home from "./ui/components/Home";
import Login from "./ui/components/Login";

export default async function Page() {

    const user = await getSession();
    
    if(!user?.user) return <Login/>

    return (<div><Home/></div>)
}