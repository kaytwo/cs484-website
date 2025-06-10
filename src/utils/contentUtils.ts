import { calculateAbsoluteDate } from './dateUtils';
import type { ContentData } from '../types/content';
import { courseConfig } from '../courseConfig';

/**
 * Transforms content data by converting relative dates to absolute dates
 */
export function transformContentData(data: ContentData): ContentData {
    console.log('Transforming content data:', JSON.stringify(data, null, 2));
    const transformed = { ...data };


    // Handle lecture dates
    if (transformed.relative_date) {
        transformed.date = calculateAbsoluteDate(transformed.relative_date);
    }

    // Handle homework dates
    if (transformed.relative_release) {
        console.log('Transforming relative_release:', transformed.relative_release);
        transformed.release = calculateAbsoluteDate(transformed.relative_release);
        console.log('Transformed to release:', transformed.release);
    }
    if (transformed.relative_due) {
        console.log('Transforming relative_due:', transformed.relative_due);
        transformed.due = calculateAbsoluteDate(transformed.relative_due);
        console.log('Transformed to due:', transformed.due);
    }

    console.log('Transformed data:', JSON.stringify(transformed, null, 2));
    return transformed;
} 