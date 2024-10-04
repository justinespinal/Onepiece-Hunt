import Image from "next/image"
import { signOut } from "@/auth"
import bg from "../../public/assets/background.jpg"

export default function Page() {
    return(
        <div className="h-[100vh] w-full">
            <span className="absolute">
                <Image
                    src={bg}
                    height={1000}
                    width={1000}
                    alt="bg"
                    className="h-[100vh] w-[100vw]"
                />
            </span>
            <div className="flex flex-col justify-center items-center p-10 relative">
                <Image
                    src="/assets/logo.png"
                    width={300}
                    height={300}
                    alt="logo"
                    className="transition-all hover:scale-110"
                />
                <form 
                    action = { async () => {
                        "use server";
                        await signOut();
                    }}
                    >
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
                <div className="flex flex-col gap-3 opacity-55">
                    <div className="bg-white rounded-md w-[75vw] h-[10vh]">

                    </div>
                    <div className="bg-red-500 rounded-md w-full h-[60vh]">

                    </div>
                </div>
            </div>
        </div>
    )
}