import { StoryObj } from "@storybook/react";
import TimerCircle from "../components/TimerCircle.tsx";
import { CircleState } from "../utils/constants.ts";

type Story = StoryObj<typeof TimerCircle>;

export default {
    component: TimerCircle,
    argTypes: {
        strokeDashoffset: { control: 'number' },
        strokeState: {
            options: Object.values(CircleState),
            control: { type: 'radio' },
        },
    },
};

export const Active: Story = {
    args: {
        strokeDashoffset: 50,
        strokeState: CircleState.ACTIVE,
    },
};

export const Completed: Story = {
    args: {
        strokeDashoffset: 0,
        strokeState: CircleState.COMPLETED,
    },
};