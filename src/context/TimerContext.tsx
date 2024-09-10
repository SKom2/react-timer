import {createContext, FC, ReactNode, useContext, useState} from "react";

const DELAY = 1000;

export interface TimerProps {
    title: string;
    endTime: number;
    elapsedTime?: number;
}

interface TimerContextProviderProps extends TimerProps {
    children: ReactNode;
}

interface TimerContextProps {
    title: string;
    endTime: number;
    elapsedTime: number;
    delay: number;
    isAnimationStarted: boolean;
    isAnimationPaused: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

const TimerContext = createContext<TimerContextProps>({
    title: '',
    endTime: 0,
    elapsedTime: 0,
    delay: DELAY,
    isAnimationStarted: false,
    isAnimationPaused: false,
    onStart: () => {},
    onPause: () => {},
    onReset: () => {},
});

export const TimerContextProvider: FC<TimerContextProviderProps> = ({ title, endTime, elapsedTime = 0, children }) => {
    const [isAnimationStarted, setIsAnimationStarted] = useState(false)
    const [isAnimationPaused, setIsAnimationPaused] = useState(true)

    const onStart = () => {
        setIsAnimationStarted(true)
        setIsAnimationPaused(false)
    }

    const onPause = () => {
        setIsAnimationPaused(true)
    }

    const onReset = () => {
        setIsAnimationStarted(false)
        setIsAnimationPaused(true)
    }

    const contextValue = {
        title,
        endTime,
        elapsedTime,
        delay: DELAY,
        isAnimationStarted,
        isAnimationPaused,
        onStart,
        onPause,
        onReset,
    }

    return (
        <TimerContext.Provider value={contextValue}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error('useTimer must be used within a TimerContextProvider');
    }

    return context;
};