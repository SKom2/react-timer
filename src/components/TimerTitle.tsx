import {useTimer} from "../context/TimerContext.tsx";

const TimerTitle = () => {
    const { title } = useTimer()

    return <h1 className="timer-title">{title}</h1>

};

export default TimerTitle;