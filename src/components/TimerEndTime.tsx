import {FC} from "react";
import {formatTime} from "../utils/formatTime.ts";

const TimerEndTime: FC<{ endTime: number }> = ({ endTime }) => {
    const formattedEndTime = formatTime(endTime)

    return <p className="timer-subtitle">{formattedEndTime} left</p>
};

export default TimerEndTime;