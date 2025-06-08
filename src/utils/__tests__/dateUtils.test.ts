import { describe, it, expect } from 'vitest';
import { calculateAbsoluteDate, validateRelativeDate } from '../dateUtils';
import type { CourseConfig } from '../../types';

describe('dateUtils', () => {
    const mockConfig: CourseConfig = {
        semesterStartDate: "2024-08-26T00:00:00",
        classDays: ["Tuesday", "Thursday"],
        defaultClassTime: "14:00:00",
        timeZone: "America/Chicago",
        skippedWeeks: [
            {
                calendarWeekStartDate: "2024-11-25T00:00:00",
                reason: "Thanksgiving Break"
            }
        ],
        courseName: "CS 484",
        semester: "Fall 2024"
    };

    describe('calculateAbsoluteDate', () => {
        it('calculates correct date for first week, first day', () => {
            const relativeDate = { week: 1, day: 1, time: "14:00:00" };
            const result = calculateAbsoluteDate(relativeDate, mockConfig);
            expect(result.toISOString()).toBe("2024-08-27T19:00:00.000Z"); // Tuesday at 2 PM CDT
        });

        it('calculates correct date for first week, second day', () => {
            const relativeDate = { week: 1, day: 2, time: "14:00:00" };
            const result = calculateAbsoluteDate(relativeDate, mockConfig);
            expect(result.toISOString()).toBe("2024-08-29T19:00:00.000Z"); // Thursday at 2 PM CDT
        });

        it('skips Thanksgiving week when calculating dates', () => {
            // Week 14 would normally be Thanksgiving week
            const relativeDate = { week: 14, day: 1, time: "14:00:00" };
            const result = calculateAbsoluteDate(relativeDate, mockConfig);
            // Should be the Tuesday after Thanksgiving
            expect(result.toISOString()).toBe("2024-12-03T20:00:00.000Z");
        });

        it('handles different times correctly', () => {
            const relativeDate = { week: 1, day: 1, time: "09:30:00" };
            const result = calculateAbsoluteDate(relativeDate, mockConfig);
            expect(result.toISOString()).toBe("2024-08-27T14:30:00.000Z"); // Tuesday at 9:30 AM CDT
        });
    });

    describe('validateRelativeDate', () => {
        it('validates correct relative dates', () => {
            const validDate = { week: 1, day: 1, time: "14:00:00" };
            expect(validateRelativeDate(validDate, mockConfig)).toBe(true);
        });

        it('rejects invalid week numbers', () => {
            const invalidDate = { week: 0, day: 1, time: "14:00:00" };
            expect(validateRelativeDate(invalidDate, mockConfig)).toBe(false);
        });

        it('rejects invalid day numbers', () => {
            const invalidDate = { week: 1, day: 3, time: "14:00:00" };
            expect(validateRelativeDate(invalidDate, mockConfig)).toBe(false);
        });

        it('rejects invalid time formats', () => {
            const invalidDate = { week: 1, day: 1, time: "25:00:00" };
            expect(validateRelativeDate(invalidDate, mockConfig)).toBe(false);
        });
    });
}); 