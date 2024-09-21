import {useTimerContext} from "../context/TimerContext.tsx";
import TimerButton from "./TimerButton.tsx";

const TimerControls = () => {
    const { onStart, onPause, onReset, isTimerStarted, isTimerPaused, isTimerFinished } = useTimerContext()

    return (
        <div className="flex justify-center gap-3">
            <TimerButton onClick={onStart} title="Start" disabled={isTimerStarted && !isTimerPaused || isTimerFinished} />
            <TimerButton onClick={onPause} title="Pause" disabled={isTimerFinished || isTimerPaused && isTimerStarted} />
            <TimerButton onClick={onReset} title="Reset"  />
        </div>
    );
};

export default TimerControls;