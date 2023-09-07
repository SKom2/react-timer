import './Timer.scss';
import { useEffect, useState } from "react";

export default function Timer() {
    const [time, setTime] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isStopButton, setIsStopButton] = useState(true)
    const [isTimingsState, setIsTimingsState] = useState(false)

    function goOnTimingTable(){
        if (isRunning) return;
        setIsTimingsState(true);
    }

    function chooseTiming(e){
        console.log(e.target.textContent.replace(/\d+/g, "").trim())
        const unitsOfTime = e.target.textContent.replace(/\d+/g, "").trim();
        const time = parseInt(e.target.textContent)
        if (unitsOfTime === 'sec'){
            setSeconds(time);
            setTime(time)
        }
        if (unitsOfTime === 'min'){
            setMinutes(time)
            setTime(time * 60)
        }
        if (unitsOfTime === 'hour'){
            setHours(time)
            setTime(time * 3600)
        }
        setIsTimingsState(false)
    }

    function startTimer() {
        if (isRunning) return;
        if (time === 0) return;
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
        setTime(0)
    }

    return (
        <section className='timer'>
            <h1 className='timer__title'>Simple Timer</h1>
            <div className="timer__container">
                <p className="timer__values hours">{hours} hours</p>
                <p className="timer__values minutes">{minutes} min</p>
                <p className="timer__values seconds">{seconds} sec</p>
            </div>
            <div className="timer__buttons">
                {!isTimingsState ? (
                        <>
                            {isStopButton ?
                                <button className="timer__button cancel-button" onClick={stopTimer}>Stop</button>
                                :
                                <button className="timer__button reset-button" onClick={resetTimer}>Reset</button>
                            }
                                <button className="timer__button time-button" onClick={goOnTimingTable}>Choose time</button>
                                <button className="timer__button start-button" onClick={startTimer}>Start</button>
                        </>
                    ) : (
                        <>
                            <button className="timer__button timing-button" onClick={chooseTiming}>15 sec</button>
                            <button className="timer__button timing-button" onClick={chooseTiming}>1 min</button>
                            <button className="timer__button timing-button" onClick={chooseTiming}>5 min</button>
                            <button className="timer__button timing-button" onClick={chooseTiming}>15 min</button>
                            <button className="timer__button timing-button" onClick={chooseTiming}>30 min</button>
                            <button className="timer__button timing-button" onClick={chooseTiming}>1 hour</button>
                        </>
                    )
                }

            </div>
        </section>
    )
}
