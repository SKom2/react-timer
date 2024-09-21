import { StoryObj } from '@storybook/react';
import TimerControls from '../components/TimerControls.tsx';
import {TimerDecorator} from "./TimerDecorator.tsx";

type Story = StoryObj<typeof TimerControls>;

export default {
    component: TimerControls,
    decorators: [TimerDecorator],
    argTypes: {
        isTimerStarted: { control: false, table: { disable: true } },
        isTimerPaused: { control: false, table: { disable: true } },
        isTimerFinished: { control: false, table: { disable: true } },
        onStart: { action: 'onStart', table: { disable: true } },
        onPause: { action: 'onPause', table: { disable: true } },
        onReset: { action: 'onReset', table: { disable: true } },
    },
} as const;

export const Default: Story = {
    args: {
        isTimerStarted: false,
        isTimerPaused: false,
        isTimerFinished: false,
    },
};

export const Started: Story = {
    args: {
        isTimerStarted: true,
        isTimerPaused: false,
        isTimerFinished: false,
    },
};

export const Paused: Story = {
    args: {
        isTimerStarted: true,
        isTimerPaused: true,
        isTimerFinished: false,
    },
};

export const Finished: Story = {
    args: {
        isTimerStarted: false,
        isTimerPaused: false,
        isTimerFinished: true,
    },
};