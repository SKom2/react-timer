import { StoryObj } from "@storybook/react";
import {TimerDecorator} from "./TimerDecorator.tsx";
import TimerTitle from "../components/TimerTitle.tsx";

type Story = StoryObj<typeof TimerTitle>;

export default {
    component: TimerTitle,
    decorators: [TimerDecorator],
    argTypes: {
        title: { control: "text" }
    }
}

export const Default: Story = {
    args: {
        title: "Timer"
    },
};