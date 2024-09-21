import { StoryObj } from "@storybook/react";
import Timer from "../components/Timer.tsx";

type Story = StoryObj<typeof Timer>;

export default {
    component: Timer,
    argTypes: {
        title: { control: "text" },
        endTime: { control: "number" },
        elapsedTime: { control: "number" },
    }
};

export const Default: Story = {
    args: {
        title: "Timer Title",
        endTime: 60,
        elapsedTime: 500,
    },
};