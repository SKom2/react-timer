import TimerCircle from "./TimerCircle.tsx";
import TimerClock from "./TimerClock.tsx";
import {useTimer} from "../hooks/useTimer.ts";

const TimerDisplay = () => {
    const { strokeDashoffset, endTime, elapsedTime, strokeColor } = useTimer();

    return (
        <div className="relative h-[170px] w-[170px] flex justify-center items-center">
            <TimerCircle strokeDashoffset={strokeDashoffset} strokeState={strokeColor} />
            <TimerClock endTime={endTime} elapsedTime={elapsedTime} />
        </div>
    );
};

export default TimerDisplay;