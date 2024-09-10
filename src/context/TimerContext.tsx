import {createContext, FC, ReactNode, useContext, useRef, useState} from "react";

const DELAY = 1000;

export interface TimerProps {
    title: string;
    endTime: number;
    elapsedTime?: number;
}

interface TimerContextProviderProps extends TimerProps {
    children: ReactNode;
}

interface TimerContextProps extends TimerProps {
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

const TimerContext = createContext<TimerContextProps>({
    title: '',
    endTime: 0,
    elapsedTime: 0,
    onStart: () => {},
    onPause: () => {},
    onReset: () => {},
})

export const TimerContextProvider: FC<TimerContextProviderProps> = ({ title, endTime, elapsedTime = 0, children }) => {
    const [endTimeState, setEndTimeState] = useState(endTime * DELAY)
    const [elapsedTimeState, setElapsedTimeState] = useState(elapsedTime  * DELAY)

    const intervalId = useRef<ReturnType<typeof setInterval>>();

    const onStart = () => {
        intervalId.current = setInterval(() => {
            setEndTimeState((endTime) => endTime - DELAY)
            setElapsedTimeState((elapsedTime) => elapsedTime + DELAY)
        }, DELAY)
    }

    const onPause = () => clearInterval(intervalId.current)

    const onReset = () => {
        setElapsedTimeState(elapsedTime * DELAY)
        setEndTimeState(endTime * DELAY)
        clearInterval(intervalId.current)
    }

    const context = {
        title,
        endTime: endTimeState / DELAY,
        elapsedTime: elapsedTimeState / DELAY,
        onStart,
        onPause,
        onReset
    }

    return (
        <TimerContext.Provider value={context}>
            {children}
        </TimerContext.Provider>
    )
}

export const useTimer = () => {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error('useTimer must be used within a TimerContextProvider');
    }

    return context;
}