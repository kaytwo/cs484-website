export interface SkippedWeek {
    calendarWeekStartDate: string;
    reason: string;
}

export interface CourseConfig {
    semesterStartDate: string;
    classDays: string[];
    defaultClassTime: string;
    timeZone: string;
    skippedWeeks: SkippedWeek[];
    courseName: string;
    semester: string;
} 