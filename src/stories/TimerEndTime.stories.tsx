import {StoryObj} from "@storybook/react";
import TimerEndTime from "../components/TimerEndTime.tsx";

type Story = StoryObj<typeof TimerEndTime>;

export default {
    component: TimerEndTime,
    argTypes: {
        endTime: { control: "number" },
    }
}

export const Default: Story = {
    args: {
        endTime: 10
    }
}
