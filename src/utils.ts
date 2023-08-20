import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(tz);

export const formatTime = (
  time: Date,
  location: string = "America/Chicago",
  includeTimezone: boolean = false
) => {
  const timeString = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(localizeTime(time, location));
  // just make it blank if the time is undefined
  return `${timeString}` + (includeTimezone ? `, ${location} time` : "");
};

export const localizeTime = (
  time: string | Date | undefined,
  location: string = "America/Chicago"
) => {
  return dayjs.tz(time, location).toDate();
};
