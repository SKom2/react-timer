import { StoryObj } from "@storybook/react";
import TimerClock from "../components/TimerClock.tsx";
import {TimerDecorator} from "./TimerDecorator.tsx";

type Story = StoryObj<typeof TimerClock>;

export default {
    component: TimerClock,
    decorators: [TimerDecorator],
    argTypes: {
        elapsedTime: { control: "number" },
        endTime: { control: "number" }
    }
}

export const Default: Story = {
    args: {
        endTime: 200,
        elapsedTime: 100,
    },
};