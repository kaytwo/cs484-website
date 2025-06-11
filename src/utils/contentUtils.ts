import { calculateAbsoluteDate } from './dateUtils';
import type { ContentData } from '../types/content';
import { courseConfig } from '../courseConfig';

/**
 * Transforms content data by converting relative dates to absolute dates
 */
export function transformContentData(data: ContentData): ContentData {
    const transformed = { ...data };


    // Handle lecture dates
    if (transformed.relative_date) {
        transformed.date = calculateAbsoluteDate(transformed.relative_date);
    }

    // Handle homework dates
    if (transformed.relative_release) {
        transformed.release = calculateAbsoluteDate(transformed.relative_release);
    }
    if (transformed.relative_due) {
        transformed.due = calculateAbsoluteDate(transformed.relative_due);
    }

    return transformed;
} 