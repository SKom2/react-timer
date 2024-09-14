import {createContext, FC, useContext, useState} from "react";
import {TimerContextProps, TimerContextProviderProps} from "../types/TimerTypes.ts";
import {convertToMilliseconds} from "../utils/formatTime.ts";

const TimerContext = createContext<TimerContextProps>({
    title: '',
    endTime: 0,
    elapsedTime: 0,

    isTimerStarted: false,
    setIsTimerStarted: () => {},
    isTimerFinished: false,
    setIsTimerFinished: () => {},
    isTimerPaused: false,

    onStart: () => {},
    onPause: () => {},
    onReset: () => {},
});

export const TimerContextProvider: FC<TimerContextProviderProps> = ({ title, endTime, elapsedTime = 0, children }) => {
    const [isTimerStarted, setIsTimerStarted] = useState(false)
    const [isTimerPaused, setIsTimerPaused] = useState(false)
    const [isTimerFinished, setIsTimerFinished] = useState(false)

    const onStart = () => {
        setIsTimerFinished(false)
        setIsTimerStarted(true)
        setIsTimerPaused(false)
    }

    const onPause = () => {
        setIsTimerPaused(true)
    }

    const onReset = () => {
        setIsTimerStarted(false)
        setIsTimerPaused(false)
        setIsTimerFinished(false)
    }

    const contextValue = {
        title,
        endTime: convertToMilliseconds(endTime),
        elapsedTime: convertToMilliseconds(elapsedTime),

        isTimerStarted,
        setIsTimerStarted,
        isTimerFinished,
        setIsTimerFinished,
        isTimerPaused,

        onStart,
        onPause,
        onReset,
    }

    return (
        <TimerContext.Provider value={contextValue}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimerContext = () => {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error('useTimer must be used within a TimerContextProvider');
    }

    return context;
};
