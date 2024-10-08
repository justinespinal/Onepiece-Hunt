import Image from "next/image"

export default function SelectItem({name, imageurl}:{name:string, imageurl:string}){
    console.log(imageurl)
    return(
        <div className="flex items-center p-5 gap-3">
            <Image
                src={"/assets"+imageurl}
                width={100}
                height={100}
                alt=""
                className="rounded"
            />
            {name}
        </div>
    )
}