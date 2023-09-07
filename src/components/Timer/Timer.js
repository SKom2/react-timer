import './Timer.scss';

export default function Timer(){


    return(
        <div className='timer'>
            <h1 className='timer__title'>Timer</h1>
            <div className="timer__container">
                <p className="timer__values hours">12hours</p>
                <p className="timer__values minutes">20min</p>
                <p className="timer__values seconds">30sec</p>
            </div>
            <div className="timer__buttons">
                <button className="timer__button cancel-button">Cancel</button>
                <button className="timer__button start-button">Start</button>
            </div>
        </div>
    )
}
