import './Timer.scss';
import { useEffect, useState } from "react";

export default function Timer() {
    const [time, setTime] = useState(5);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isStopButton, setIsStopButton] = useState(true)

    function startTimer() {
        if (isRunning) return;
        setIsRunning(true);

        const endTime = time + Math.floor(Date.now() / 1000);

        displayTime(time)

        const id = setInterval(() => {
            const remainingTime = endTime - Math.floor(Date.now() / 1000);

            if (remainingTime <= 0) {
                clearInterval(id);
                setIsRunning(false);
                displayTime(0)
                return;
            }

            displayTime(remainingTime);
        }, 1000);

        setIntervalId(id)
    }

    function displayTime(time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    function stopTimer(){
        if (!isRunning) return;
        clearInterval(intervalId)
        setIsStopButton(false)
        setIsRunning(false)
    }

    function resetTimer(){
        setIsStopButton(true)
        setHours(0)
        setMinutes(0);
        setSeconds(0);
    }

    return (
        <section className='timer'>
            <h1 className='timer__title'>Timer</h1>
            <div className="timer__container">
                <p className="timer__values hours">{hours} hours</p>
                <p className="timer__values minutes">{minutes} min</p>
                <p className="timer__values seconds">{seconds} sec</p>
            </div>
            <div className="timer__buttons">
                {isStopButton ?
                    <button className="timer__button cancel-button" onClick={stopTimer}>Stop</button>
                    :
                    <button className="timer__button reset-button" onClick={resetTimer}>Reset</button>
                }
                <button className="timer__button start-button" onClick={startTimer}>Start</button>
            </div>
        </section>
    )
}
