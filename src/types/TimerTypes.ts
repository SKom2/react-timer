import React, {ReactNode} from "react";

export interface TimerProps {
    title: string;
    endTime: number;
    elapsedTime?: number;
}

export interface TimerContextProviderProps extends TimerProps {
    children: ReactNode;
}

export interface TimerContextProps {
    title: string;
    endTime: number;
    elapsedTime: number;

    isTimerStarted: boolean,
    setIsTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
    isTimerFinished: boolean,
    setIsTimerFinished: React.Dispatch<React.SetStateAction<boolean>>;
    isTimerPaused: boolean,

    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}
