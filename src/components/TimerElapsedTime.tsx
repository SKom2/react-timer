import {formatTime} from "../utils/formatTime.ts";
import {useTimer} from "../context/TimerContext.tsx";

const TimerElapsedTime = () => {
    const { elapsedTime } = useTimer();

    const formattedElapsedTime = formatTime(elapsedTime)

    return <p className="timer-display">{formattedElapsedTime}</p>
};

export default TimerElapsedTime;