import { useState } from "react"

export default function Time(){
    let time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hourCycle: 'h24',})
    
    const [currTime, setCurrTime] = useState(time)


    function updateTime(){
        time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hourCycle: 'h24',})
        setCurrTime(time)
    }
    
    setInterval(() => {
        updateTime()
    }, 1000)

    return(
        <p className="time">
            {`${currTime}`}
        </p>
    )
}