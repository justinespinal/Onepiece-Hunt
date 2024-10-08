"use server"

import { getSession } from '@auth0/nextjs-auth0';
import Home from "./ui/components/Home";
// import Login from "./ui/components/Login";

export default async function Page() {

    const user = await getSession();
    console.log(user)
    return (<div><Home/></div>)
}