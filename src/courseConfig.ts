import type { CourseConfig } from './types';

export const courseConfig: CourseConfig = {
    semesterStartDate: "2025-08-25T00:00:00", // Monday of first week
    classDays: ["Tuesday", "Thursday"], // Days of the week classes are held
    defaultClassTime: "14:00:00", // Default class start time
    timeZone: "America/Chicago", // Course timezone

    // Weeks that should be skipped (e.g., spring break)
    // These weeks will not increment the course week counter
    skippedWeeks: [
        // Uncomment and modify these as needed
        // {
        //   calendarWeekStartDate: "2024-11-25T00:00:00", // Monday of Thanksgiving week
        //   reason: "Thanksgiving Break"
        // },
        // {
        //   calendarWeekStartDate: "2025-03-17T00:00:00", // Monday of Spring Break week
        //   reason: "Spring Break"
        // }
    ],

    // Course metadata
    courseName: "CS 484",
    semester: "Fall 2024"
}; 