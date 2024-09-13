import {ReactNode} from "react";

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
    strokeDashoffset: number;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}
