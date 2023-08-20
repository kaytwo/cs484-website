import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(tz);

export const localizeTime = (
  time: string | Date | undefined,
  location: string = "America/Chicago"
) => {
  const timeString = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(dayjs.tz(time, location).toDate());
  // just make it blank if the time is undefined
  return time ? `${timeString}, ${location} time` : "";
};
