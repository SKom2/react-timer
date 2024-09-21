import TimerButton from "../components/TimerButton.tsx";
import {StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

type Story = StoryObj<typeof TimerButton>;

export default {
    component: TimerButton,
    argTypes: {
        onClick: { table: { disable: true } },
        disabled: { control: "boolean" },
        title: { control: "text" }
    },
    args: {
        onClick: fn()
    }
}


export const Default: Story = {
    args: {
        title: "Start",
        disabled: false,
    },
}

export const Disabled: Story = {
    args: {
        title: "Start",
        disabled: true,
    },
}