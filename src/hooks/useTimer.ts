import {useTimerContext} from "../context/TimerContext.tsx";
import {useEffect, useRef, useState} from "react";
import {CircleColors, MILLISECOND, STROKE_DASHARRAY} from "../utils/constants.ts";
import {convertToSeconds} from "../utils/formatTime.ts";

export const useTimer = () => {
    const { elapsedTime, endTime, isTimerStarted, isTimerPaused, setIsTimerStarted, isTimerFinished, setIsTimerFinished } = useTimerContext();

    const [strokeDashoffset, setStrokeDashoffset] = useState(STROKE_DASHARRAY);
    const [strokeColor, setStrokeColor] = useState(CircleColors.ACTIVE);

    const timerAnimationFrameRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);

    const startTimerAnimationTime = useRef<number | null>(null);
    const finishTimerAnimationTime = useRef<number | null>(null);

    const mutableElapsedTime = useRef(elapsedTime)
    const mutableEndTime = useRef(endTime)

    const timerAnimation = (currentTime: number) => {
        if (!startTimerAnimationTime.current || !finishTimerAnimationTime.current) {
            startTimerAnimationTime.current = currentTime - mutableElapsedTime.current;
            finishTimerAnimationTime.current = startTimerAnimationTime.current + endTime;
        }

        mutableElapsedTime.current = currentTime - startTimerAnimationTime.current;
        mutableEndTime.current = Math.ceil((finishTimerAnimationTime.current - currentTime) / MILLISECOND) * MILLISECOND;

        const progress = mutableElapsedTime.current / endTime;
        const newStrokeDashoffset = STROKE_DASHARRAY * (1 - progress);

        setStrokeDashoffset(newStrokeDashoffset)

        if (mutableElapsedTime.current < endTime && isTimerStarted && !isTimerPaused) {
            timerAnimationFrameRef.current = requestAnimationFrame(timerAnimation);
        } else {
            setIsTimerStarted(false)
            setIsTimerFinished(true)
            cancelAnimationFrame(timerAnimationFrameRef.current!);
        }
    };

    const pauseTimerAnimation = () => {
        startTimerAnimationTime.current = null
        finishTimerAnimationTime.current = null
        cancelAnimationFrame(timerAnimationFrameRef.current!)
    }

    const resetTimerAnimation = () => {
        pauseTimerAnimation()
        mutableEndTime.current = endTime
        mutableElapsedTime.current = elapsedTime
        setStrokeDashoffset(STROKE_DASHARRAY)
        if (intervalRef.current) {
            setStrokeColor(CircleColors.ACTIVE)
            clearInterval(intervalRef.current)
        }
    }

    const finishTimerAnimation = () => {
        setStrokeDashoffset(0)
        setStrokeColor(CircleColors.COMPLETED)
        intervalRef.current = setInterval(() => {
            setStrokeColor((prevColor) => prevColor === CircleColors.ACTIVE ? CircleColors.COMPLETED : CircleColors.ACTIVE)
        }, MILLISECOND)
    }

    useEffect(() => {
        if (isTimerStarted && !isTimerPaused && !isTimerFinished) {
            timerAnimationFrameRef.current = requestAnimationFrame(timerAnimation)
        } else if (isTimerPaused) {
            pauseTimerAnimation()
        } else if (isTimerFinished) {
            finishTimerAnimation()
        } else {
            resetTimerAnimation()
        }
    }, [isTimerPaused, isTimerStarted, isTimerFinished]);

    return {
        strokeDashoffset,
        strokeColor,
        endTime: convertToSeconds(mutableEndTime.current),
        elapsedTime: convertToSeconds(mutableElapsedTime.current),
    }
}