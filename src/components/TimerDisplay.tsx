import TimerCircle from "./TimerCircle.tsx";
import TimerClock from "./TimerClock.tsx";

const TimerDisplay = () => {
    return (
        <div className="relative h-[170px] w-[170px] flex justify-center items-center">
            <TimerCircle />
            <TimerClock />
        </div>
    );
};

export default TimerDisplay;