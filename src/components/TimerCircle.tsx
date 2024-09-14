import {FC} from "react";
import {
    CIRCLE_LOCATION_X,
    CIRCLE_LOCATION_Y,
    CIRCLE_RADIUS,
    CircleColors,
    STROKE_DASHARRAY
} from "../utils/constants.ts";

const TimerCircle: FC<{ strokeDashoffset: number, strokeColor: string }> = ({ strokeDashoffset, strokeColor }) => {
    return (
        <svg className="relative w-[170px] h-[170px] rotate-[270deg]">
            <circle cx={CIRCLE_LOCATION_X} cy={CIRCLE_LOCATION_Y} r={CIRCLE_RADIUS}
                    className="w-full h-full fill-transparent stroke-[6px] stroke-circle-bg"></circle>
            <circle cx={CIRCLE_LOCATION_X} cy={CIRCLE_LOCATION_Y} r={CIRCLE_RADIUS}
                    className={`w-full h-full fill-transparent stroke-[6px] ${strokeColor == CircleColors.ACTIVE ? `stroke-circle-bg-${CircleColors.ACTIVE}` : `stroke-circle-bg-${CircleColors.COMPLETED}`}`}
                    style={{strokeDasharray: STROKE_DASHARRAY, strokeDashoffset: strokeDashoffset}}></circle>
        </svg>
    );
};

export default TimerCircle;