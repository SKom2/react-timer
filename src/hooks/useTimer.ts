import {useEffect, useRef, useState} from "react";
import {useTimerContext} from "../context/TimerContext.tsx";
import {CircleColors, MILLISECOND, STROKE_DASHARRAY} from "../utils/constants.ts";
import {convertToSeconds} from "../utils/formatTime.ts";
import {setToLocalStorage} from "../utils/storageHelpers.ts";

export const useTimer = () => {
    const {
        elapsedTime,
        endTime,
        isTimerStarted,
        isTimerPaused,
        setIsTimerStarted,
        isTimerFinished,
        setIsTimerFinished,
        cachedTimerState,
    } = useTimerContext();
    const [strokeDashoffset, setStrokeDashoffset] = useState(cachedTimerState?.current.strokeDashoffset ?? STROKE_DASHARRAY);
    const [strokeColor, setStrokeColor] = useState(cachedTimerState?.current.strokeColor ?? CircleColors.ACTIVE);

    const timerAnimationFrameRef = useRef<number | null>(cachedTimerState?.current.timerAnimationFrameRef ?? null);
    const intervalRef = useRef<number | null>(cachedTimerState?.current.intervalRef ?? null);

    const startTimerAnimationTime = useRef<number | null>(null);
    const finishTimerAnimationTime = useRef<number | null>(null);

    const mutableElapsedTime = useRef(cachedTimerState?.current.elapsedTime ?? elapsedTime);
    const mutableEndTime = useRef(cachedTimerState?.current.endTime ?? endTime);

    useEffect(() => {
        if (cachedTimerState) {
            cachedTimerState.current = setToLocalStorage(cachedTimerState, "elapsedTime", mutableElapsedTime.current);
            cachedTimerState.current = setToLocalStorage(cachedTimerState, "endTime", mutableEndTime.current);
            cachedTimerState.current = setToLocalStorage(cachedTimerState, "strokeDashoffset", strokeDashoffset);
            cachedTimerState.current = setToLocalStorage(cachedTimerState, "strokeColor", strokeColor);
            cachedTimerState.current = setToLocalStorage(cachedTimerState, "timerAnimationFrameRef", timerAnimationFrameRef.current);
            cachedTimerState.current = setToLocalStorage(cachedTimerState, "intervalRef", intervalRef.current);
        }
    }, [strokeDashoffset, strokeColor]);

    useEffect(() => {
        if (isTimerStarted && !isTimerPaused && !isTimerFinished) {
            if (timerAnimationFrameRef.current !== null) {
                cancelAnimationFrame(timerAnimationFrameRef.current);
            }
            timerAnimationFrameRef.current = requestAnimationFrame(timerAnimation);
        } else if (isTimerPaused) {
            pauseTimerAnimation();
        } else if (isTimerFinished) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
            finishTimerAnimation();
        } else {
            resetTimerAnimation()
        }
    }, [isTimerPaused, isTimerStarted, isTimerFinished]);

    const timerAnimation = (currentTime: number) => {
        if (!startTimerAnimationTime.current || !finishTimerAnimationTime.current) {
            startTimerAnimationTime.current = currentTime - (mutableElapsedTime.current ?? 0);
            finishTimerAnimationTime.current = startTimerAnimationTime.current + endTime;
        }

        mutableElapsedTime.current = Math.ceil(currentTime - startTimerAnimationTime.current);
        mutableEndTime.current = Math.ceil((finishTimerAnimationTime.current - currentTime) / MILLISECOND) * MILLISECOND;

        const progress = mutableElapsedTime.current / endTime;
        const newStrokeDashoffset = STROKE_DASHARRAY * (1 - progress);

        setStrokeDashoffset(newStrokeDashoffset);

        if (mutableElapsedTime.current < endTime && isTimerStarted && !isTimerPaused) {
            timerAnimationFrameRef.current = requestAnimationFrame(timerAnimation);
        } else {
            setIsTimerStarted(false)
            setIsTimerFinished(true)
            cancelAnimationFrame(timerAnimationFrameRef.current!);
        }
    };

    const pauseTimerAnimation = () => {
        startTimerAnimationTime.current = null;
        finishTimerAnimationTime.current = null;
        cancelAnimationFrame(timerAnimationFrameRef.current!);
    };

    const finishTimerAnimation = () => {
        setStrokeDashoffset(0);
        setStrokeColor(CircleColors.COMPLETED);
        intervalRef.current = setInterval(() => {
            setStrokeColor((prevColor) => prevColor === CircleColors.ACTIVE ? CircleColors.COMPLETED : CircleColors.ACTIVE);
        }, MILLISECOND);
    };

    const resetTimerAnimation = () => {
        pauseTimerAnimation();
        mutableEndTime.current = endTime;
        mutableElapsedTime.current = elapsedTime;
        setStrokeDashoffset(STROKE_DASHARRAY);
        if (intervalRef.current) {
            setStrokeColor(CircleColors.ACTIVE);
            clearInterval(intervalRef.current);
        }
    };

    return {
        strokeDashoffset,
        strokeColor,
        endTime: convertToSeconds(mutableEndTime.current),
        elapsedTime: convertToSeconds(mutableElapsedTime.current ?? 0),
    };
};