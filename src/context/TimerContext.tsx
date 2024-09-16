import {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {TimerContextProps, TimerContextProviderProps} from "../types/TimerTypes.ts";
import {convertToMilliseconds} from "../utils/formatTime.ts";
import {defaultTimerState, getTimerStateFromLocalStorage, setToLocalStorage} from "../utils/storageHelpers.ts";

const TimerContext = createContext<TimerContextProps>({
    title: '',
    endTime: 0,
    elapsedTime: 0,
    duration: 0,

    isTimerStarted: false,
    isTimerPaused: false,
    isTimerFinished: false,
    isTimerReset: false,
    setIsTimerStarted: () => {},
    setIsTimerFinished: () => {},

    cachedTimerStateRef: null,
    cachedTimerState: defaultTimerState,

    onStart: () => {},
    onPause: () => {},
    onReset: () => {},
});

export const TimerContextProvider: FC<TimerContextProviderProps> = ({ title, endTime, elapsedTime, children }) => {
    const initialEndTime = convertToMilliseconds(endTime);
    const initialElapsedTime = convertToMilliseconds(elapsedTime ? elapsedTime : 0);
    const duration = initialElapsedTime + initialEndTime;

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
        duration,

        cachedTimerStateRef: cachedTimerStateRef,
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