import {useTimer} from "../context/TimerContext.tsx";
import {useEffect, useRef, useState} from "react";


const TimerDisplay = () => {
    const { elapsedTime, endTime, delay, title, isAnimationStarted, isAnimationPaused } = useTimer()

    const [endTimeState, setEndTimeState] = useState(endTime * delay);
    const [elapsedTimeState, setElapsedTimeState] = useState(elapsedTime * delay);

    const intervalId = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
        if (isAnimationStarted && !isAnimationPaused) {
            intervalId.current = setInterval(() => {
                setEndTimeState((endTime) => endTime - delay);
                setElapsedTimeState((elapsedTime) => elapsedTime + delay);
            }, delay);
        } else  {
            clearInterval(intervalId.current)
            if (!isAnimationStarted) {
                setElapsedTimeState(elapsedTime * delay);
                setEndTimeState(endTime * delay);
            }
        }

        return () => clearInterval(intervalId.current);
    }, [isAnimationStarted, isAnimationPaused]);

    return (
        <div>
            <h1 className="timer-title">{title}</h1>
            <p>{endTimeState / delay}</p>
            <p>{elapsedTimeState / delay}</p>
        </div>
    );
};

export default TimerDisplay;