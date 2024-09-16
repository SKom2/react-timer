import {StoredTimerState} from "../types/TimerTypes.ts";
import {MutableRefObject} from "react";

export const defaultTimerState: StoredTimerState = {
    elapsedTime: 0,
    endTime: 0,
    strokeDashoffset: 0,

    isTimerStarted: false,
    isTimerPaused: false,
};

export const getTimerStateFromLocalStorage = (): StoredTimerState => {
    const valueFromStorage = localStorage.getItem("timerStorage")

    if (valueFromStorage) {
        return JSON.parse(valueFromStorage);
    } else {
        localStorage.setItem("timerStorage", JSON.stringify(defaultTimerState))
        return defaultTimerState
    }
};

export const setToLocalStorage = <T>(state: MutableRefObject<StoredTimerState>, key: keyof StoredTimerState, value: T): void => {
    state.current = {
        ...state.current,
        [key]: value,
    };

    localStorage.setItem("timerStorage", JSON.stringify(state.current));
};