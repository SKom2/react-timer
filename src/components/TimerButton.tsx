import {FC} from "react";

const TimerButton: FC<{ onClick: () => void, title: string, disabled?: boolean }> = ({ onClick, title, disabled = false }) => {
    return <button onClick={onClick} className={`w-16 p-1 outline outline-1 rounded-button timer-button-text ${disabled ? "bg-button-outline" : "outline-button-outline"}`} disabled={disabled}>{title}</button>
};

export default TimerButton;