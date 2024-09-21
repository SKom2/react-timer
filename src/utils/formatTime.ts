import {MILLISECOND} from "./constants.ts";

export const MAX_TIME = 3599;

export const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
}

export const convertToSeconds = (time: number) => {
    return time / MILLISECOND;
}

export const convertToMilliseconds = (time: number) => {
    return time * MILLISECOND;
}