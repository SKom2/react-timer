import {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {TimerContextProps, TimerContextProviderProps} from "../types/TimerTypes.ts";
import {convertToMilliseconds, MAX_TIME} from "../utils/formatTime.ts";
import {getTimerStateFromLocalStorage, setToLocalStorage} from "../utils/storageHelpers.ts";

export const TimerContext = createContext<TimerContextProps | null>(null);

export const TimerContextProvider: FC<TimerContextProviderProps> = ({ title, endTime, elapsedTime, children }) => {
    if (elapsedTime ? (elapsedTime + endTime) > MAX_TIME : endTime > MAX_TIME) throw new Error('Maximum allowed time exceeded');
    const initialEndTime = convertToMilliseconds(endTime);
    const initialElapsedTime = convertToMilliseconds(elapsedTime ? elapsedTime : 0);

    const cachedTimerStateRef = useRef(getTimerStateFromLocalStorage());

    const [isTimerStarted, setIsTimerStarted] = useState(cachedTimerStateRef.current.isTimerStarted);
    const [isTimerPaused, setIsTimerPaused] = useState(cachedTimerStateRef.current.isTimerPaused);
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [isTimerReset, setIsTimerReset] = useState(false);

    useEffect(() => {
        setToLocalStorage(cachedTimerStateRef, "isTimerStarted", isTimerStarted);
        setToLocalStorage(cachedTimerStateRef, "isTimerPaused", isTimerPaused);
    }, [isTimerStarted, isTimerPaused]);

    const onStart = () => {
        setIsTimerStarted(true);
        setIsTimerPaused(false);
        setIsTimerFinished(false);
        setIsTimerReset(false)
    };

    const onPause = () => {
        setIsTimerPaused(true);
    };

    const onReset = () => {
        setIsTimerStarted(false);
        setIsTimerPaused(false);
        setIsTimerFinished(false);
        setIsTimerReset(true)
    };

    const contextValue = {
        title,
        endTime: initialEndTime,
        elapsedTime: initialElapsedTime,

        cachedTimerStateRef,
        cachedTimerState: cachedTimerStateRef.current,

        isTimerStarted,
        isTimerPaused,
        isTimerFinished,
        isTimerReset,
        setIsTimerStarted,
        setIsTimerFinished,

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

export const useTimerContext = () => {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error('useTimerContext must be used within a TimerContextProvider');
    }

    return context;
};