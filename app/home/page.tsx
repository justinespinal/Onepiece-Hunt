import Image from "next/image"
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