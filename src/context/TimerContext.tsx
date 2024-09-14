import {createContext, FC, useContext, useEffect, useRef, useState} from "react";
import {TimerContextProps, TimerContextProviderProps} from "../types/TimerTypes.ts";
import {convertToMilliseconds} from "../utils/formatTime.ts";
import {getFromLocalStorage, setToLocalStorage} from "../utils/storageHelpers.ts";

const TimerContext = createContext<TimerContextProps>({
    title: '',
    endTime: 0,
    cachedTimerState: null,

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
    const initialEndTime = convertToMilliseconds(endTime);
    const initialElapsedTime = convertToMilliseconds(elapsedTime);

    const cachedTimerState = useRef(getFromLocalStorage());

    const [isTimerStarted, setIsTimerStarted] = useState(cachedTimerState.current.isTimerStarted);
    const [isTimerPaused, setIsTimerPaused] = useState(cachedTimerState.current.isTimerPaused);
    const [isTimerFinished, setIsTimerFinished] = useState(cachedTimerState.current.isTimerFinished);

    useEffect(() => {
        if (isTimerFinished) {
            setIsTimerFinished(false);
        }
    }, []);

    useEffect(() => {
        cachedTimerState.current = setToLocalStorage(cachedTimerState, "isTimerStarted", isTimerStarted);
        cachedTimerState.current = setToLocalStorage(cachedTimerState, "isTimerPaused", isTimerPaused);
        cachedTimerState.current = setToLocalStorage(cachedTimerState, "isTimerFinished", isTimerFinished);
    }, [isTimerStarted, isTimerPaused, isTimerFinished]);

    const onStart = () => {
        setIsTimerFinished(false);
        setIsTimerStarted(true);
        setIsTimerPaused(false);
    };

    const onPause = () => {
        setIsTimerPaused(true);
    };

    const onReset = () => {
        setIsTimerStarted(false);
        setIsTimerPaused(false);
        setIsTimerFinished(false);
    };

    const contextValue = {
        title,
        endTime: initialEndTime,
        elapsedTime: initialElapsedTime,
        cachedTimerState,

        isTimerStarted,
        setIsTimerStarted,
        isTimerFinished,
        setIsTimerFinished,
        isTimerPaused,

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