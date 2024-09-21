import {FC, ReactNode, useRef, useState} from "react";
import { TimerContextProps } from "../types/TimerTypes.ts";
import { convertToMilliseconds } from "../utils/formatTime.ts";
import { STROKE_DASHARRAY } from "../utils/constants.ts";
import { TimerContext } from "../context/TimerContext.tsx";

export const TimerProviderMock: FC<{ timerOptions: TimerContextProps, children: ReactNode }> = ({ timerOptions, children }) => {
    const initialEndTime = convertToMilliseconds(timerOptions.endTime);
    const initialElapsedTime = convertToMilliseconds(timerOptions.elapsedTime ? timerOptions.elapsedTime : 0);

    const cachedTimerStateRef = useRef({
        elapsedTime: initialElapsedTime,
        endTime: initialEndTime,
        strokeDashoffset: STROKE_DASHARRAY * (1 - initialElapsedTime / (initialEndTime + initialElapsedTime)),
        isTimerStarted: timerOptions.isTimerStarted,
        isTimerPaused: timerOptions.isTimerPaused,
    });

    const [isTimerStarted, setIsTimerStarted] = useState(timerOptions.isTimerStarted);
    const [isTimerPaused, setIsTimerPaused] = useState(timerOptions.isTimerPaused);
    const [isTimerFinished, setIsTimerFinished] = useState(timerOptions.isTimerFinished);
    const [isTimerReset, setIsTimerReset] = useState(timerOptions.isTimerReset);

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
        title: timerOptions.title,
        endTime: initialEndTime,
        elapsedTime: initialElapsedTime,

        isTimerStarted,
        isTimerPaused,
        isTimerFinished,
        isTimerReset,
        setIsTimerStarted,
        setIsTimerFinished,

        cachedTimerStateRef,
        cachedTimerState: cachedTimerStateRef.current,

        onReset,
        onPause,
        onStart,
    };

    return (
        <TimerContext.Provider value={contextValue}>
            {children}
        </TimerContext.Provider>
    );
};

export const TimerDecorator = (Story: FC, context: { args: TimerContextProps }) => (
    <TimerProviderMock timerOptions={context.args}>
        <Story />
    </TimerProviderMock>
);
