import {FC} from 'react';
import {TimerContextProvider, TimerProps} from "../context/TimerContext.tsx";
import TimerControls from "./TimerControls.tsx";
import TimerDisplay from "./TimerDisplay.tsx";

const Timer: FC<TimerProps> = ({ title, endTime, elapsedTime }) => {
    return (
        <TimerContextProvider title={title} endTime={endTime} elapsedTime={elapsedTime}>
            <div className="w-80 p-10 rounded text-center bg-blue-500 ">
                <TimerDisplay />
                <TimerControls />
            </div>
        </TimerContextProvider>
    );
};

export default Timer;