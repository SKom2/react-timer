const MAX_TIME = 60 * 60;

export const formatTime = (time: number) => {
    if (time > MAX_TIME) throw new Error('Maximum allowed time exceeded');

    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
}