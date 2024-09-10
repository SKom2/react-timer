import {useTimer} from "../context/TimerContext.tsx";

const TimerControls = () => {
    const { onStart, onPause, onReset } = useTimer()

    return (
        <div className="flex justify-between gap-2">
            <button onClick={onStart} className="w-20 p-1 rounded-2xl border border-white">Start</button>
            <button onClick={onPause} className="w-20 p-1 rounded-2xl border border-white">Pause</button>
            <button onClick={onReset} className="w-20 p-1 rounded-2xl border border-white">Reset</button>
        </div>
    );
};

export default TimerControls;