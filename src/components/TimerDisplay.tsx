import {useTimer} from "../context/TimerContext.tsx";
import {useEffect, useRef, useState} from "react";
import TimerTitle from "./TimerTitle.tsx";
import TimerElapsedTimeClock from "./TimerElapsedTimeClock.tsx";
import TimerEndTimeClock from "./TimerEndTimeClock.tsx";


const TimerDisplay = () => {
    const { elapsedTime, endTime, delay, isAnimationStarted, isAnimationPaused } = useTimer()

    const [endTimeState, setEndTimeState] = useState(endTime * delay);
    const [elapsedTimeState, setElapsedTimeState] = useState(elapsedTime * delay);

    const intervalId = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
        if (isAnimationStarted && !isAnimationPaused) {
            intervalId.current = setInterval(() => {
                setEndTimeState((endTime) => endTime - delay);
                setElapsedTimeState((elapsedTime) => elapsedTime + delay);
            }, delay);
        } else {
            clearInterval(intervalId.current)
            if (!isAnimationStarted) {
                setElapsedTimeState(elapsedTime * delay);
                setEndTimeState(endTime * delay);
            }
        }

        return () => clearInterval(intervalId.current);
    }, [isAnimationStarted, isAnimationPaused]);

    return (
        <div className="border-[6px] h-[170px] w-[170px] flex flex-col gap-2 justify-center rounded-circle border-circle-bg">
            <TimerTitle />
            <TimerElapsedTimeClock elapsedTime={elapsedTimeState / delay} />
            <TimerEndTimeClock endTime={endTimeState / delay} />
        </div>
    );
};

export default TimerDisplay;