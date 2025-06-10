import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import type { CourseConfig } from "../types";
import { courseConfig } from "../courseConfig";

dayjs.extend(utc);
dayjs.extend(tz);

export interface RelativeDate {
    week: number;
    day: number;
    time: string;
}

export const formatTime = (
    time: Date,
    location: string = courseConfig.timeZone,
    includeTimezone: boolean = false
) => {
    const timeString = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: location,
    }).format(localizeTime(time, location));
    return `${timeString}` + (includeTimezone ? `, ${location} time` : "");
};

export const localizeTime = (
    time: string | Date | undefined,
    location: string = courseConfig.timeZone
) => {
    return dayjs.tz(time, location).toDate();
};

/**
 * Calculates the absolute date for a relative date based on the course configuration.
 * Takes into account skipped weeks and class days.
 */
export function calculateAbsoluteDate(relativeDate: RelativeDate): Date {
    console.log('Calculating absolute date for:', relativeDate);
    console.log('Using config:', courseConfig);

    const { week, day, time } = relativeDate;
    const { semesterStartDate, classDays, timeZone, skippedWeeks = [] } = courseConfig;

    // Handle day 0 as a special case - return a default date
    if (day === 0) {
        console.log('Day is 0, returning default date');
        // Return a date at the start of the target week
        let currentDate = dayjs.tz(semesterStartDate, timeZone);
        let currentWeek = 1;
        let calendarWeek = 1;

        while (currentWeek < week) {
            const nextWeekStart = currentDate.add(1, 'week');
            const isSkippedWeek = skippedWeeks.some(skip =>
                dayjs.tz(skip.calendarWeekStartDate, timeZone).isSame(nextWeekStart, 'week')
            );

            if (!isSkippedWeek) {
                currentWeek++;
            }
            calendarWeek++;
            currentDate = nextWeekStart;
        }

        // Set to Monday of that week
        while (currentDate.format('dddd') !== 'Monday') {
            currentDate = currentDate.add(1, 'day');
        }

        // Set the time
        const [hours, minutes, seconds] = time.split(':').map(Number);
        currentDate = currentDate
            .hour(hours)
            .minute(minutes)
            .second(seconds);

        return currentDate.toDate();
    }

    // Start with the semester start date
    let currentDate = dayjs.tz(semesterStartDate, timeZone);
    console.log('Starting from:', currentDate.format());

    // Calculate the target week, taking into account skipped weeks
    let currentWeek = 1;
    let calendarWeek = 1;

    while (currentWeek < week) {
        // Check if the next calendar week is a skipped week
        const nextWeekStart = currentDate.add(1, 'week');
        const isSkippedWeek = skippedWeeks.some(skip =>
            dayjs.tz(skip.calendarWeekStartDate, timeZone).isSame(nextWeekStart, 'week')
        );

        if (!isSkippedWeek) {
            currentWeek++;
        }
        calendarWeek++;
        currentDate = nextWeekStart;
        console.log(`Week ${calendarWeek}: currentWeek=${currentWeek}, isSkipped=${isSkippedWeek}`);
    }

    // Move to the correct day of the week
    const targetDay = classDays[day - 1];
    console.log('Target day:', targetDay);

    // Validate target day exists
    if (!targetDay) {
        console.error('Invalid day index:', day, 'Class days:', classDays);
        throw new Error(`Invalid day index ${day}. Valid days are 1-${classDays.length}`);
    }

    // Safety check to prevent infinite loop
    let attempts = 0;
    const maxAttempts = 7; // Maximum number of days to try

    while (currentDate.format('dddd') !== targetDay && attempts < maxAttempts) {
        currentDate = currentDate.add(1, 'day');
        attempts++;
        console.log(`Attempt ${attempts}: Current day: ${currentDate.format('dddd')}, Target: ${targetDay}`);
    }

    if (attempts >= maxAttempts) {
        console.error('Failed to find matching day after', maxAttempts, 'attempts');
        console.error('Current date:', currentDate.format());
        console.error('Target day:', targetDay);
        console.error('Class days:', classDays);
        throw new Error(`Could not find matching day for ${targetDay}`);
    }

    // Set the time
    const [hours, minutes, seconds] = time.split(':').map(Number);
    currentDate = currentDate
        .hour(hours)
        .minute(minutes)
        .second(seconds);
    console.log('Final date:', currentDate.format());

    return currentDate.toDate();
}

/**
 * Validates that a relative date is valid according to the course configuration.
 */
export function validateRelativeDate(relativeDate: RelativeDate): boolean {
    const { week, day, time } = relativeDate;
    const { classDays } = courseConfig;

    // Validate week is positive
    if (week < 1) return false;

    // Validate day is within range of class days
    if (day < 1 || day > classDays.length) return false;

    // Validate time format (HH:mm:ss)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(time)) return false;

    return true;
} 