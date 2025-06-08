import { docsLoader } from "@astrojs/starlight/loaders";
import { glob, type LoaderContext, type Loader } from 'astro/loaders';
import { calculateAbsoluteDate } from './dateUtils';
import type { CourseConfig } from '../types';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// Load course configuration
const courseConfigPath = path.join(process.cwd(), 'src', 'courseConfig.yaml');
const courseConfig = yaml.load(fs.readFileSync(courseConfigPath, 'utf8')) as CourseConfig;

interface ContentEntry {
    data: {
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
    };
    [key: string]: any;
}

/**
 * Custom loader for docs collection that handles relative dates
 */
export function customDocsLoader(): Loader {
    const baseLoader = docsLoader();

    return async (context: LoaderContext) => {
        const entries = await baseLoader(context) as ContentEntry[];

        return entries.map(entry => {
            const data = { ...entry.data };

            // Handle lecture dates
            if (data.relative_date) {
                data.date = calculateAbsoluteDate(data.relative_date, courseConfig).toISOString();
            }

            // Handle homework dates
            if (data.relative_release) {
                data.release = calculateAbsoluteDate(data.relative_release, courseConfig).toISOString();
            }
            if (data.relative_due) {
                data.due = calculateAbsoluteDate(data.relative_due, courseConfig).toISOString();
            }

            return {
                ...entry,
                data
            };
        });
    };
}

/**
 * Custom loader for exams collection that handles relative dates
 */
export function customExamsLoader(): Loader {
    const baseLoader = glob({ pattern: '**/[^_]*.yaml', base: "./src/content/exams" });

    return async (context: LoaderContext) => {
        const entries = await baseLoader(context) as ContentEntry[];

        return entries.map(entry => {
            const data = { ...entry.data };

            if (data.relative_date) {
                data.date = calculateAbsoluteDate(data.relative_date, courseConfig).toISOString();
            }

            return {
                ...entry,
                data
            };
        });
    };
} 