import {CIRCLE_LOCATION_X, CIRCLE_LOCATION_Y, CIRCLE_RADIUS, STROKE_DASHARRAY} from "../utils/constants.ts";
import {useTimer} from "../context/TimerContext.tsx";

const TimerCircle = () => {
    const { strokeDashoffset } = useTimer();

    return (
        <svg className="relative w-[170px] h-[170px] rotate-[270deg]">
            <circle cx={CIRCLE_LOCATION_X} cy={CIRCLE_LOCATION_Y} r={CIRCLE_RADIUS}
                    className="w-full h-full fill-transparent stroke-[6px] stroke-circle-bg"></circle>
            <circle cx={CIRCLE_LOCATION_X} cy={CIRCLE_LOCATION_Y} r={CIRCLE_RADIUS}
                    className="w-full h-full fill-transparent stroke-[6px] stroke-circle-bg-active [stroke-dasharray:483] [stroke-dashoffset:483]"
                    style={{strokeDasharray: STROKE_DASHARRAY, strokeDashoffset: strokeDashoffset}}></circle>
        </svg>
    );
};

export default TimerCircle;