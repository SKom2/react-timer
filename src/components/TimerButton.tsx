import {FC} from "react";

const TimerButton: FC<{ onAction: () => void, title: string }> = ({ onAction, title }) => {
    return <button onClick={onAction} className="w-16 p-1 outline outline-1 outline-button-outline rounded-button timer-button-text">{title}</button>
};

export default TimerButton;