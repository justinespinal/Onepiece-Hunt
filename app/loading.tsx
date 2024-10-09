import Image from "next/image"
export default function loading(){
    return (
        <div className="flex justify-center items-center">
            <Image
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                width={100}
                height={100}
                alt="loading"
            />
        </div>
    )
}