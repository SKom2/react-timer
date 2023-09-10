import './Timer.scss';
import { useEffect, useState } from "react";
import {useForm} from "../../hooks/useForm";
import sound from '../../sounds/signal-elektronnogo-budilnika-33304.mp3'

export default function Timer() {
    const [time, setTime] = useState(0);
    const [initialTime, setInitialTime] = useState(0)
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isInProcess, setIsInProcess] = useState(false)
    const [intervalId, setIntervalId] = useState(null);
    const [isStopButton, setIsStopButton] = useState(false)
    const [isFormAvailable, setIsFormAvailable] = useState(false)
    const [remainingTime, setRemainingTime] = useState(0)
    const [endTime, setEndTIme] = useState(0)
    const [isSignalActive, setIsSignalActive] = useState(false)
    const [signal] = useState(new Audio(sound))

    const {values, handleChange, resetForm} = useForm({
        hours: '',
        minutes: '',
        seconds: ''
    });

    function startTimer() {
        if (isRunning) return;
        if (time === 0) return;

        setIsStopButton(true)
        setIsRunning(true);
        setIsInProcess(true)

        const endTime = time + Math.floor(Date.now() / 1000);
        setEndTIme(endTime)

        displayTime(time)

        const id = setInterval(() => {
            const remainingTime = endTime - Math.floor(Date.now() / 1000);

            if (remainingTime <= 0) {
                clearInterval(id);
                setIsRunning(false);
                setIsStopButton(false)
                setIsInProcess(false)
                displayTime(0)
                playSignal()
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
        const remainingTime = endTime - Math.floor(Date.now() / 1000);
        setRemainingTime(remainingTime)
        setTime(remainingTime)
    }

    function resetTimer(){
        stopSignal()
        setIsStopButton(false);
        setIsRunning(false);
        setIsInProcess(false)
        setHours(0)
        setMinutes(0);
        setSeconds(0);
        setTime(initialTime)
        clearInterval(intervalId)
        displayTime(initialTime)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const hours = parseInt(values.hours) || 0;
        const minutes = parseInt(values.minutes) || 0;
        const seconds = parseInt(values.seconds) || 0;
        const totalTime = hours * 3600 + minutes * 60 + seconds;
        setTime(totalTime);
        setInitialTime(totalTime)
        setIsFormAvailable(false);
        setIsStopButton(false)
        displayTime(totalTime)
    }

    function playSignal() {
        signal.play();
        setIsSignalActive(true)
    }

    function stopSignal(){
        signal.pause();
        signal.currentTime = 0;
        setIsSignalActive(false)
    }


    return (
        <section className='timer'>
            <h1 className='timer__title'>Simple Timer</h1>
            {isFormAvailable ? (
                <form className="timer__container">
                    <label className='timer__values-label'><input
                        type='number'
                        className="timer__values hours"
                        placeholder='0'
                        name='hours'
                        value={values.hours || ''}
                        onChange={handleChange}
                    /> hours</label>

                    <label className='timer__values-label'>
                        <input
                            type='number'
                            className="timer__values minutes"
                            placeholder='0'
                            name='minutes'
                            value={values.minutes || ''}
                            onChange={handleChange}
                        ></input>
                        min
                    </label>
                    <label className='timer__values-label'>
                        <input
                            type='number'
                            className="timer__values seconds"
                            placeholder='0'
                            name='seconds'
                            value={values.seconds || ''}
                            onChange={handleChange}
                        ></input>
                        sec
                    </label>
                </form>
            ) : (
                <div className="timer__container" onClick={() => {
                    if (isRunning) return;
                    resetForm()
                    setIsFormAvailable(true)
                }}>
                    <label className='timer__values-label'>
                        <p className="timer__values hours">{hours}</p>
                        hours
                    </label>
                    <label className='timer__values-label'>
                        <p className="timer__values minutes">{minutes}</p>
                        min
                    </label>
                    <label className='timer__values-label'>
                        <p className="timer__values seconds">{seconds}</p>
                        sec
                    </label>
                </div>
            )}
            <div className="timer__buttons">
                {isFormAvailable ? (
                    <>
                        <button className="timer__button cancel-button" onClick={() => setIsFormAvailable(false)}>Cancel</button>
                        <button type="submit" className="timer__button submit-button" onClick={handleSubmit} disabled={!values.hours && !values.minutes && !values.seconds}>Submit</button>
                    </>
                ) : (
                    <>
                        <button className="timer__button reset-button" onClick={resetTimer}>Reset</button>
                        {!isStopButton ?
                            !isInProcess ?
                                <button className="timer__button start-button" onClick={startTimer} disabled={isSignalActive}>Start</button>
                                :
                                <button className="timer__button start-button" onClick={startTimer}>Resume</button>
                            :
                            (<button className="timer__button stop-button" onClick={stopTimer}>Stop</button>)
                        }
                    </>
                )}

            </div>
        </section>
    )
}
