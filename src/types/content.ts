import type { Dayjs } from "dayjs";

export interface ContentData {
  relative_date?: {
    week: number;
    day: number | string;
    time?: string | undefined;
  };
  relative_release?: {
    week: number;
    day: number | string;
    time?: string;
  };
  relative_due?: {
    week: number;
    day: number | string;
    time?: string;
  };
  date?: string | Dayjs;
  release?: string | Dayjs;
  due?: string | Dayjs;
  [key: string]: any;
}
