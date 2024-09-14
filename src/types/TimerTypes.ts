import React, {MutableRefObject, ReactNode} from "react";
import {CircleColors} from "../utils/constants.ts";

export interface TimerProps {
    title: string;
    endTime: number;
    elapsedTime?: number;
}

export interface TimerContextProviderProps extends TimerProps {
    children: ReactNode;
}

export interface TimerContextProps extends TimerProps {
    cachedTimerState: MutableRefObject<TimerStorage> | null,

    isTimerStarted: boolean,
    setIsTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
    isTimerFinished: boolean,
    setIsTimerFinished: React.Dispatch<React.SetStateAction<boolean>>;
    isTimerPaused: boolean,

    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

export interface TimerStorage {
    endTime: number | null;
    elapsedTime: number | null;
    isTimerStarted: boolean,
    isTimerPaused: boolean,
    isTimerFinished: boolean,
    strokeDashoffset: number,
    strokeColor: CircleColors,
    timerAnimationFrameRef: number | null,
    intervalRef: number | null
}
