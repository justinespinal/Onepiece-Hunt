import clsx from "clsx"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"

import { CSSProperties } from "react"
import "../globals.css"


export default function ValueCard({value, stringFormat}:{value:string, stringFormat:string | undefined}){
    let icon = faArrowUp
    if(value==="lower"){
        icon = faArrowDown
    }

    const arrowStyle: CSSProperties = {
        ["color" as any]: '#88241c'
    };

    return(
        <div className={clsx("w-full h-full rounded flex items-center justify-center relative",
            {
                "incorrect": value==="higher" || value=="lower",
                "correct": value==="correct"
            }
        )}>
            {value!=="correct" && 
                <FontAwesomeIcon icon={icon} size="6x" className="absolute" style={arrowStyle}/>
            }
            <h1 className="relative">{stringFormat}</h1>
        </div>
    )
}