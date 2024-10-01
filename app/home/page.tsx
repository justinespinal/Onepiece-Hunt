import Image from "next/image"

export default function Page() {
    return(
        <div className="bg-[url('/assets/background.jpg')] bg-center h-[100vh] w-full">
            <div className="flex flex-col justify-center items-center p-10">
                <Image
                    src="/assets/logo.png"
                    width={300}
                    height={300}
                    alt="logo"
                    className="transition-all hover:scale-110"
                />
                <div className="flex flex-col gap-3">
                    <div className="bg-white rounded-md w-[75vw] h-[10vh]">

                    </div>
                    <div className="bg-red-500 rounded-md w-full h-[60vh]">

                    </div>
                </div>
            </div>
        </div>
    )
}