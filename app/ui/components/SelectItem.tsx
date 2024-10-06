import Image from "next/image"

export default function SelectItem({id, name, imageurl}:{id:string, name:string, imageurl:string}){
    return(
        <div className="flex items-center p-5 gap-3">
            <Image
                src={"/assets"+imageurl}
                width={100}
                height={100}
                alt=""
            />
            {name}
        </div>
    )
}