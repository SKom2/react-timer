import TimerTitle from "./TimerTitle.tsx";
import TimerElapsedTime from "./TimerElapsedTime.tsx";
import TimerEndTime from "./TimerEndTime.tsx";
import {FC} from "react";

const TimerClock: FC<{
    endTime: number,
    elapsedTime: number
}> = ({
    endTime,
    elapsedTime,
}) => {
    return (
        <div className="absolute flex flex-col justify-center items-center">
            <TimerTitle />
            <TimerElapsedTime elapsedTime={elapsedTime} />
            <TimerEndTime endTime={endTime} />
        </div>
    );
};

export default TimerClock;