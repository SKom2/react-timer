import TimerTitle from "./TimerTitle.tsx";
import TimerElapsedTime from "./TimerElapsedTime.tsx";
import TimerEndTime from "./TimerEndTime.tsx";

const TimerClock = () => {
    return (
        <div className="absolute">
            <TimerTitle/>
            <TimerElapsedTime/>
            <TimerEndTime/>
        </div>
    );
};

export default TimerClock;