import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function Login(){
  return (
    <div className="bg-slate-400 h-[100vh] w-[100vw] text-black font-bold p-6">
      <div className="flex justify-center bg-blue-500 rounded-md">
        <Image
          src="/assets/logo.png"
          width={1000}
          height={1000}
          alt="One piece hunt logo"
        />
      </div>
      <div className="flex flex-col justify-center gap-6 mt-4 px-6 py-10">
        <h1 className="text-xl">Welcome to Onepiece Hunt! This is the unlimited one piece character finder. Compete with friends and grow your one piece knowledge!</h1>
        <a 
          className="bg-blue-400 p-3 rounded-md flex items-center gap-5 text-sm self-start px-6 py-3"
          href="/api/auth/login">
          <span>Log in</span>
          <FontAwesomeIcon icon={faArrowRight} className="w-3" />
        </a>
      </div>
    </div>
  )
}