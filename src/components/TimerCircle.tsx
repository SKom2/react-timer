import {FC} from "react";
import {
    CIRCLE_LOCATION_X,
    CIRCLE_LOCATION_Y,
    CIRCLE_RADIUS,
    CircleState,
    STROKE_DASHARRAY
} from "../utils/constants.ts";

const TimerCircle: FC<{ strokeDashoffset: number, strokeState: string }> = ({ strokeDashoffset, strokeState }) => {
    return (
        <svg className="relative w-[170px] h-[170px] rotate-[270deg]">
            <circle cx={CIRCLE_LOCATION_X} cy={CIRCLE_LOCATION_Y} r={CIRCLE_RADIUS}
                    className="w-full h-full fill-transparent stroke-[6px] stroke-circle-bg"></circle>
            <circle cx={CIRCLE_LOCATION_X} cy={CIRCLE_LOCATION_Y} r={CIRCLE_RADIUS}
                    className={`w-full h-full fill-transparent stroke-[6px] ${strokeState == CircleState.ACTIVE ? `stroke-circle-bg-active` : `stroke-circle-bg-completed`}`}
                    style={{strokeDasharray: STROKE_DASHARRAY, strokeDashoffset: strokeDashoffset}}></circle>
        </svg>
    );
};

export default TimerCircle;