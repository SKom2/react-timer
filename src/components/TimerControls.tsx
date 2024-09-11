import {useTimer} from "../context/TimerContext.tsx";
import TimerButton from "./TimerButton.tsx";

const TimerControls = () => {
    const { onStart, onPause, onReset } = useTimer()

    return (
        <div className="flex justify-center gap-3">
            <TimerButton onAction={onStart} title="Start"/>
            <TimerButton onAction={onPause} title="Pause" />
            <TimerButton onAction={onReset} title="Reset" />
        </div>
    );
};

export default TimerControls;