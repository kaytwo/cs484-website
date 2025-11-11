import dayjs, { type Dayjs } from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { courseConfig } from "../courseConfig";

dayjs.extend(utc);
dayjs.extend(tz);

export interface RelativeDate {
  week: number;
  day: number | string;
  time?: string | undefined;
}

export const formatTime = (
  time: Dayjs,
  location: string = courseConfig.timeZone,
  includeTimezone = false,
) => {
  const timeString = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: location,
  }).format(time.toDate());
  return `${timeString}` + (includeTimezone ? `, ${location} time` : "");
};

export const localizeTime = (date: string | number | Date | Dayjs): Dayjs => {
  return dayjs.tz(date, courseConfig.timeZone);
};

/**
 * Calculates the absolute date for a relative date based on the course configuration.
 * Takes into account skipped weeks and class days.
 */
export function calculateAbsoluteDate(relativeDate: RelativeDate): Dayjs {
  const {
    semesterStartDate,
    classDays,
    timeZone,
    defaultClassTime,
    skippedWeeks = [],
  } = courseConfig;
  const { week, day, time = defaultClassTime } = relativeDate;

  if (typeof day === "number" && (day < 1 || day > classDays.length)) {
    throw new Error(
      `Invalid day index ${day}. Valid days are 1-${classDays.length}`,
    );
  }

  // Determine the start date of the target course week.
  // It's the semester start date plus `week - 1` course weeks.
  // A course week is a calendar week that is not skipped.
  let weekStartDate = dayjs.tz(semesterStartDate, timeZone);
  let courseWeeksPassed = 1;

  const skippedWeekStarts = skippedWeeks.map((s) =>
    dayjs.tz(s.calendarWeekStartDate, timeZone),
  );

  while (courseWeeksPassed < week) {
    weekStartDate = weekStartDate.add(1, "week");
    if (
      !skippedWeekStarts.some((skipDate) =>
        skipDate.isSame(weekStartDate, "week"),
      )
    ) {
      courseWeeksPassed++;
    }
  }

  const targetDayName = typeof day === "number" ? classDays[day - 1] : day;

  const dayNameToIndex = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  } as const;

  type DayName = keyof typeof dayNameToIndex;

  if (!targetDayName || !(targetDayName in dayNameToIndex)) {
    throw new Error(
      `Invalid day: ${targetDayName}. It must be a valid day of the week string or a valid index into classDays.`,
    );
  }

  const targetDayIndex = dayNameToIndex[targetDayName as DayName];

  // Set the date to the correct day within the target week
  const dateOnCorrectDay = weekStartDate.day(targetDayIndex);

  // By combining the date and time into a single string and then parsing it
  // with the timezone, we avoid potential issues with DST where sequentially
  // setting the time components might not behave as expected.
  const dateString = dateOnCorrectDay.format("YYYY-MM-DD");
  return dayjs.tz(`${dateString}T${time}`, timeZone);
}

/**
 * Validates that a relative date is valid according to the course configuration.
 */
export function validateRelativeDate(relativeDate: RelativeDate): boolean {
  const { defaultClassTime } = courseConfig;
  const { week, day, time = defaultClassTime } = relativeDate;
  const { classDays } = courseConfig;

  // Validate week is positive
  if (week < 1) return false;

  if (typeof day === "string") {
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (!validDays.includes(day)) return false;
  } else {
    // Validate day is within range of class days
    if (day < 1 || day > classDays.length) return false;
  }

  // Validate time format (HH:mm:ss)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  if (!timeRegex.test(time)) return false;

  return true;
}
