import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import Link from "next/link"
export default function Page(){
    return (
        <div className="h-[100vh] bg-white text-black">
            <Link href="/" className="w-10 mr-auto">
                <FontAwesomeIcon className="w-10 p-1" icon={faArrowLeft} style={{color: "#000000",}} />
            </Link>

            <h1 className="font-bold text-4xl text-center">Profile</h1>
            <form>
                
            </form>
        </div>
    )
}