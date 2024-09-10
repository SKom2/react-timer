import {useTimer} from "../context/TimerContext.tsx";
import {useEffect} from "react";

const TimerDisplay = () => {
    const { elapsedTime, endTime, title } = useTimer()

    useEffect(() => {
        console.log(elapsedTime)
        console.log(endTime)
    }, [elapsedTime, endTime])

    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
};

export default TimerDisplay;