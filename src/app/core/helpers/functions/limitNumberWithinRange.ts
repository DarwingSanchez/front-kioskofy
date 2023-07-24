/**
 * Avoid a number input goes over or under a limit range
 * @param num Number to limit
 * @param min lower limit
 * @param max upper limit
 * @returns number limited to range
 */
export const limitNumberWithinRange = (num: number, min: number, max: number): any => {
    return Math.min(Math.max(num, min), max)
};
