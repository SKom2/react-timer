import {formatTime} from "../utils/formatTime.ts";
import {useTimer} from "../context/TimerContext.tsx";

const TimerEndTime = () => {
    const { endTime } = useTimer();

    const formattedEndTime = formatTime(endTime)

    return <p className="timer-subtitle">{formattedEndTime} left</p>
};

export default TimerEndTime;