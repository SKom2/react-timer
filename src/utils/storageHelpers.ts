import {TimerStorage} from "../types/TimerTypes.ts";
import {CircleColors, STROKE_DASHARRAY} from "./constants.ts";
import {MutableRefObject} from "react";

export const getFromLocalStorage = (): TimerStorage => {
    const defaultTimerState = {
        elapsedTime: null,
        endTime: null,
        isTimerStarted: false,
        isTimerPaused: false,
        isTimerFinished: false,
        strokeDashoffset: STROKE_DASHARRAY,
        strokeColor: CircleColors.ACTIVE,
        timerAnimationFrameRef: null,
        intervalRef: null,
    };

    const storedValue = localStorage.getItem("timerStorage");
    return storedValue ? JSON.parse(storedValue) : defaultTimerState;
};

export const setToLocalStorage = <T>(state: MutableRefObject<TimerStorage>, key: keyof TimerStorage, value: T): TimerStorage => {
    const newState = {
        ...state.current,
        [key]: value,
    };

    localStorage.setItem("timerStorage", JSON.stringify(newState));

    return newState
};