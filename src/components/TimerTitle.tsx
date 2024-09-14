import {useTimerContext} from "../context/TimerContext.tsx";

const TimerTitle = () => {
    const { title } = useTimerContext()

    return <h1 className="timer-title">{title}</h1>

};

export default TimerTitle;