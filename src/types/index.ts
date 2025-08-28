export interface CourseConfig {
  semesterStartDate: string;
  classDays: string[];
  timeZone: string;
  skippedWeeks: {
    calendarWeekStartDate: string;
  }[];
}
