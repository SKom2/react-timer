import {FC} from "react";

const TimerButton: FC<{ onAction: () => void, title: string, disabled?: boolean }> = ({ onAction, title, disabled = false }) => {
    return <button onClick={onAction} className={`w-16 p-1 outline outline-1  rounded-button timer-button-text ${disabled ? "outline-black" : "outline-button-outline"}`} disabled={disabled}>{title}</button>
};

export default TimerButton;