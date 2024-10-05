import Image from "next/image"

export default function SelectItem({id, name, imageurl}:{id:string, name:string, imageurl:string}){
    return(
        <div>
            <Image
                src={imageurl}
                width={100}
                height={100}
                alt=""
            />
            {name}
        </div>
    )
}