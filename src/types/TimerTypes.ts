import {Dispatch, MutableRefObject, ReactNode, SetStateAction} from "react";

export interface TimerProps {
    title: string;
    endTime: number;
    elapsedTime?: number;
}

export interface TimerContextProviderProps extends TimerProps {
    children: ReactNode;
}

export interface TimerContextProps extends TimerProps {
    elapsedTime: number;

    isTimerStarted: boolean,
    isTimerPaused: boolean,
    isTimerFinished: boolean,
    isTimerReset: boolean,
    setIsTimerStarted: Dispatch<SetStateAction<boolean>>;
    setIsTimerFinished: Dispatch<SetStateAction<boolean>>;

    cachedTimerStateRef: MutableRefObject<StoredTimerState> | null,
    cachedTimerState: StoredTimerState,

    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

export interface StoredTimerState {
    endTime: number;
    elapsedTime: number;
    strokeDashoffset: number,

    isTimerStarted: boolean,
    isTimerPaused: boolean,
}
