import './Timer.scss';
import { useEffect, useState } from "react";
import {useForm} from "../../hooks/useForm";

export default function Timer() {
    const [time, setTime] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isStopButton, setIsStopButton] = useState(true)
    const [isFormAvailable, setIsFormAvailable] = useState(false)
    const [isTimingsState, setIsTimingsState] = useState(false)

    const {values, handleChange, errors, isValid, setIsValid} = useForm({
        hours: '',
        minutes: '',
        seconds: ''
    });

    function startTimer() {
        if (isRunning) return;
        setIsStopButton(false)
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
        setIsRunning(false)
    }

    function resetTimer(){
        setIsStopButton(true)
        setHours(0)
        setMinutes(0);
        setSeconds(0);
        setTime(0)
        displayTime(0)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const hours = parseInt(values.hours) || 0;
        const minutes = parseInt(values.minutes) || 0;
        const seconds = parseInt(values.seconds) || 0;
        const totalTime = hours * 3600 + minutes * 60 + seconds;
        setTime(totalTime);
        setIsFormAvailable(false);
        setIsStopButton(true)
        displayTime(totalTime)
    }

    return (
        <section className='timer'>
            <h1 className='timer__title'>Simple Timer</h1>
            {isFormAvailable ? (
                <form className="timer__container">
                    <input
                        type='number'
                        className="timer__values hours"
                        placeholder='00 hours'
                        name='hours'
                        value={values.hours || ''}
                        onChange={handleChange}
                    ></input>
                    <input
                        type='number'
                        className="timer__values minutes"
                        placeholder='00 minutes'
                        name='minutes'
                        value={values.minutes || ''}
                        onChange={handleChange}
                    ></input>
                    <input
                        type='number'
                        className="timer__values seconds"
                        placeholder='00 secs'
                        name='seconds'
                        value={values.seconds || ''}
                        onChange={handleChange}
                    ></input>
                </form>
            ) : (
                <div className="timer__container" onClick={() => setIsFormAvailable(true)}>
                    <p className="timer__values hours">{hours} hours</p>
                    <p className="timer__values minutes">{minutes} min</p>
                    <p className="timer__values seconds">{seconds} sec</p>
                </div>
            )}
            <div className="timer__buttons">
                {isFormAvailable ? (
                    <>
                        <button className="timer__button cancel-button" onClick={() => setIsFormAvailable(false)}>Cancel</button>
                        <button type="submit" className="timer__button submit-button" onClick={handleSubmit}>Submit</button>
                    </>
                ) : (
                    <>
                        <button className="timer__button reset-button" onClick={resetTimer}>Reset</button>
                        {isStopButton ?
                            <button className="timer__button start-button" onClick={startTimer}>Start</button>
                            :
                            <button className="timer__button stop-button" onClick={stopTimer}>Stop</button>
                        }
                    </>
                )}

            </div>
        </section>
    )
}
