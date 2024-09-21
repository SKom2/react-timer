import {StoryObj} from "@storybook/react";
import TimerElapsedTime from "../components/TimerElapsedTime.tsx";

type Story = StoryObj<typeof TimerElapsedTime>;

export default {
    component: TimerElapsedTime,
    argTypes: {
        elapsedTime: { control: "number" },
    }
}

export const Default: Story = {
    args: {
        elapsedTime: 10
    }
}
