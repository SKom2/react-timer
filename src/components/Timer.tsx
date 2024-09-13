import {FC} from 'react';
import {TimerContextProvider} from "../context/TimerContext.tsx";
import TimerControls from "./TimerControls.tsx";
import TimerDisplay from "./TimerDisplay.tsx";
import {TimerProps} from "../types/TimerTypes.ts";

const Timer: FC<TimerProps> = ({ title, endTime, elapsedTime }) => {
    return (
        <TimerContextProvider title={title} endTime={endTime} elapsedTime={elapsedTime}>
            <div className="p-8 rounded-[25px] text-center bg-timer-bg">
                <div className="flex flex-col justify-center items-center gap-8">
                    <TimerDisplay />
                    <TimerControls />
                </div>
            </div>
        </TimerContextProvider>
    );
};

export default Timer;