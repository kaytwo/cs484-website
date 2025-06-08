import { calculateAbsoluteDate } from './dateUtils';
import type { CourseConfig } from '../types';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// Load course configuration
const courseConfigPath = path.join(process.cwd(), 'src', 'courseConfig.yaml');
const courseConfig = yaml.load(fs.readFileSync(courseConfigPath, 'utf8')) as CourseConfig;

interface ContentData {
    relative_date?: {
        week: number;
        day: number;
        time: string;
    };
    relative_release?: {
        week: number;
        day: number;
        time: string;
    };
    relative_due?: {
        week: number;
        day: number;
        time: string;
    };
    date?: string;
    release?: string;
    due?: string;
    [key: string]: any;
}

/**
 * Transforms content data by converting relative dates to absolute dates
 */
export function transformContentData(data: ContentData): ContentData {
    console.log('Transforming content data:', JSON.stringify(data, null, 2));
    const transformed = { ...data };

    // Handle lecture dates
    if (transformed.relative_date) {
        console.log('Transforming relative_date:', transformed.relative_date);
        transformed.date = calculateAbsoluteDate(transformed.relative_date, courseConfig).toISOString();
        console.log('Transformed to date:', transformed.date);
    }

    // Handle homework dates
    if (transformed.relative_release) {
        console.log('Transforming relative_release:', transformed.relative_release);
        transformed.release = calculateAbsoluteDate(transformed.relative_release, courseConfig).toISOString();
        console.log('Transformed to release:', transformed.release);
    }
    if (transformed.relative_due) {
        console.log('Transforming relative_due:', transformed.relative_due);
        transformed.due = calculateAbsoluteDate(transformed.relative_due, courseConfig).toISOString();
        console.log('Transformed to due:', transformed.due);
    }

    console.log('Transformed data:', JSON.stringify(transformed, null, 2));
    return transformed;
} 