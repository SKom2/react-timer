import {FC} from "react";
import {formatTime} from "../utils/formatTime.ts";

const TimerElapsedTime: FC<{ elapsedTime: number }> = ({ elapsedTime }) => {
    const formattedElapsedTime = formatTime(elapsedTime)

    return <p className="timer-display">{formattedElapsedTime}</p>
};

export default TimerElapsedTime;