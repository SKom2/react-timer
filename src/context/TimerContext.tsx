import {createContext, FC, useContext, useState, useRef} from "react";
import {TimerContextProps, TimerContextProviderProps} from "../types/TimerTypes.ts";
import {DELAY, STROKE_DASHARRAY} from "../utils/constants.ts";

const TimerContext = createContext<TimerContextProps>({
    title: '',
    endTime: 0,
    elapsedTime: 0,
    strokeDashoffset: STROKE_DASHARRAY,
    onStart: () => {},
    onPause: () => {},
    onReset: () => {},
});

export const TimerContextProvider: FC<TimerContextProviderProps> = ({ title, endTime, elapsedTime = 0, children }) => {
    const [strokeDashoffset, setStrokeDashoffset] = useState(STROKE_DASHARRAY);

    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const finishTimeRef = useRef<number | null>(null);

    const elapsedTimeRef = useRef(elapsedTime * DELAY);
    const endTimeRef = useRef(endTime * DELAY);

    const duration = endTime * DELAY;

    const animation = (currentTime: number) => {
        if (!startTimeRef.current || !finishTimeRef.current) {
            startTimeRef.current = currentTime - elapsedTimeRef.current;
            finishTimeRef.current = startTimeRef.current + duration;
        }

        elapsedTimeRef.current = currentTime - startTimeRef.current;
        endTimeRef.current = Math.ceil((finishTimeRef.current - currentTime) / 1000) * 1000;

        const progress = elapsedTimeRef.current / duration;
        setStrokeDashoffset(STROKE_DASHARRAY * (1 - progress));

        if (elapsedTimeRef.current < duration) {
            animationFrameRef.current = requestAnimationFrame(animation);
        } else {
            cancelAnimationFrame(animationFrameRef.current!);
        }
    };

    const onStart = () => {
        animationFrameRef.current = requestAnimationFrame(animation);
    };

    const onPause = () => {
        startTimeRef.current = null;
        finishTimeRef.current = null;
        cancelAnimationFrame(animationFrameRef.current!);
    };

    const onReset = () => {
        setStrokeDashoffset(STROKE_DASHARRAY);
        endTimeRef.current = endTime * DELAY;
        elapsedTimeRef.current = elapsedTime * DELAY;
        startTimeRef.current = null;
        finishTimeRef.current = null;
        cancelAnimationFrame(animationFrameRef.current!);
    };

    const contextValue = {
        title,
        endTime: endTimeRef.current / DELAY,
        elapsedTime: elapsedTimeRef.current / DELAY,
        strokeDashoffset,
        onStart,
        onPause,
        onReset,
    };

    return (
        <TimerContext.Provider value={contextValue}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error('useTimer must be used within a TimerContextProvider');
    }

    return context;
};