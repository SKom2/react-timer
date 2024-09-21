import { StoryObj } from '@storybook/react';
import TimerDisplay from '../components/TimerDisplay.tsx';
import {TimerDecorator} from "./TimerDecorator.tsx";

type Story = StoryObj<typeof TimerDisplay>;

export default {
    component: TimerDisplay,
    decorators: [TimerDecorator],
    argTypes: {
        title: { control: 'text' },
        endTime: { control: 'number' },
        elapsedTime: { control: 'number' },

        isTimerStarted: { table: { disable: true } },
        isTimerPaused: { table: { disable: true } },
        isTimerFinished: { table: { disable: true } },
        isTimerReset: { table: { disable: true } },
    },
}

export const Started: Story = {
    args: {
        title: "Timer",
        elapsedTime: 0,
        endTime: 180,
        isTimerStarted: true,
        isTimerPaused: false,
        isTimerFinished: false,
        isTimerReset: false,
    },
};

export const Paused: Story = {
    args: {
        title: "Paused Timer",
        elapsedTime: 90,
        endTime: 20,
        isTimerStarted: true,
        isTimerPaused: true,
        isTimerFinished: false,
        isTimerReset: false,
    },
};

export const Finished: Story = {
    args: {
        title: "Finished Timer",
        elapsedTime: 20,
        endTime: 0,
        isTimerStarted: false,
        isTimerPaused: false,
        isTimerFinished: true,
        isTimerReset: false,
    },
    argTypes: {
        elapsedTime: {
            control: { disable: true },
        },
        endTime: {
            control: { disable: true }
        }
    },
};

export const Reset: Story = {
    args: {
        title: "Reset Timer",
        elapsedTime: 0,
        endTime: 0,
        isTimerStarted: false,
        isTimerPaused: false,
        isTimerFinished: false,
        isTimerReset: true,
    },
    argTypes: {
        elapsedTime: {
            control: { disable: true },
        },
        endTime: {
            control: { disable: true }
        }
    },
};