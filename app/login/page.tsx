"use client";

import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"


export default function Page(){

    return (
        <div className="bg-white flex flex-col items-center justify-center gap-6 h-[100vh]">
            <div className="bg-blue-500 rounded-md">
                <Image
                    src="/assets/logo.png"
                    width={500}
                    height={500}
                    alt="logo"
                />
            </div>
            {/* Login in component */}
            <div className="text-black flex flex-col bg-gray-100 p-10 rounded-md">
                <h1 className="text-2xl mb-3">Login to Continue or <span><a href="/create" className="text-blue-500">Create an Account</a></span></h1>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="text-base pb-2">Email</label>
                        <input placeholder="Enter your email address" name="email" type="email" required className="border-blue-500 border rounded py-[9px] pl-10 placeholder:text-gray-500">
                        </input>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-base pb-2">Password</label>
                        <input placeholder="Enter your password" name="password" type="password" required className="border-blue-500 border rounded py-[9px] pl-10 placeholder:text-gray-500"></input>
                    </div>
                    <button className="flex items-center justify-between bg-blue-500 rounded-md px-4 h-10">
                        <span>Log in</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-3" />
                    </button>
                </form>
            </div>
        </div>
    )
}