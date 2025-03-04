import {useEffect, useRef, useState} from "react";
import {useTimerContext} from "../context/TimerContext.tsx";
import {CircleState, MILLISECOND, STROKE_DASHARRAY} from "../utils/constants.ts";
import {convertToSeconds} from "../utils/formatTime.ts";
import {setToLocalStorage} from "../utils/storageHelpers.ts";
import alarmSound from "../assets/sounds/gorgeous.mp3"

export const useTimer = () => {
    const {
        elapsedTime,
        endTime,

        isTimerStarted,
        isTimerPaused,
        isTimerFinished,
        isTimerReset,
        setIsTimerStarted,
        setIsTimerFinished,

        cachedTimerStateRef,
        cachedTimerState,
    } = useTimerContext();
    const duration = endTime + elapsedTime;
    const [strokeDashoffset, setStrokeDashoffset] = useState<number>(
        isTimerStarted
            ? cachedTimerState.strokeDashoffset
            : STROKE_DASHARRAY * (1 - elapsedTime / duration)
    );
    const [strokeColor, setStrokeColor] = useState<string>(CircleState.ACTIVE);

    const timerAnimationFrameRef = useRef<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimerAnimationTime = useRef<number | null>(null);
    const finishTimerAnimationTime = useRef<number | null>(null);

    const alarm = useRef(new Audio(alarmSound))

    const mutableElapsedTime = useRef<number>(isTimerStarted ? cachedTimerState.elapsedTime : elapsedTime);
    const mutableEndTime = useRef<number>(isTimerStarted ? cachedTimerState.endTime : endTime);

    useEffect(() => {
        if (isTimerStarted && !isTimerPaused && !isTimerFinished) {
            startTimerAnimation()
        } else if (isTimerPaused) {
            pauseTimerAnimation()
        } else if (isTimerFinished) {
            finishTimerAnimation()
        } else if (isTimerReset) {
            resetTimerAnimation()
        }

        return () => {
            if (timerAnimationFrameRef.current !== null) {
                cancelAnimationFrame(timerAnimationFrameRef.current);
            }
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }
    }, [isTimerPaused, isTimerStarted, isTimerFinished, isTimerReset]);

    const timerAnimation = (currentTime: number) => {
        if (!startTimerAnimationTime.current || !finishTimerAnimationTime.current) {
            startTimerAnimationTime.current = currentTime - mutableElapsedTime.current;
            finishTimerAnimationTime.current = startTimerAnimationTime.current + duration;
        }

        mutableElapsedTime.current = Math.ceil(currentTime - startTimerAnimationTime.current);
        mutableEndTime.current = Math.ceil((finishTimerAnimationTime.current - currentTime) / MILLISECOND) * MILLISECOND;

        const progress = mutableElapsedTime.current / duration;
        const newStrokeDashoffset = STROKE_DASHARRAY * (1 - progress);

        setStrokeDashoffset(newStrokeDashoffset);

        if (cachedTimerStateRef) {
            setToLocalStorage(cachedTimerStateRef, "elapsedTime", mutableElapsedTime.current);
            setToLocalStorage(cachedTimerStateRef, "endTime", mutableEndTime.current);
            setToLocalStorage(cachedTimerStateRef, "strokeDashoffset", newStrokeDashoffset);
        }

        if (mutableElapsedTime.current < duration && isTimerStarted && !isTimerPaused) {
            timerAnimationFrameRef.current = requestAnimationFrame(timerAnimation);
        } else {
            setIsTimerStarted(false)
            setIsTimerFinished(true)
        }
    };

    const startTimerAnimation = () => {
        timerAnimationFrameRef.current = requestAnimationFrame(timerAnimation);
    }

    const pauseTimerAnimation = () => {
        startTimerAnimationTime.current = null;
        finishTimerAnimationTime.current = null;
        if (timerAnimationFrameRef.current !== null) {
            cancelAnimationFrame(timerAnimationFrameRef.current);
        }
    };

    const finishTimerAnimation = () => {
        if (timerAnimationFrameRef.current !== null) {
            cancelAnimationFrame(timerAnimationFrameRef.current);
            setStrokeDashoffset(0)
        }
        alarm.current.play();
        intervalRef.current = setInterval(() => {
            setStrokeColor((prevColor) => prevColor === CircleState.ACTIVE ? CircleState.COMPLETED : CircleState.ACTIVE);
        }, MILLISECOND);
    };

    const resetTimerAnimation = () => {
        pauseTimerAnimation();
        alarm.current.pause()
        alarm.current.currentTime = 0;
        mutableEndTime.current = duration;
        mutableElapsedTime.current = 0;
        setStrokeDashoffset(STROKE_DASHARRAY);
    };

    return {
        strokeDashoffset,
        strokeColor,
        endTime: convertToSeconds(mutableEndTime.current),
        elapsedTime: convertToSeconds(mutableElapsedTime.current),
    };
};