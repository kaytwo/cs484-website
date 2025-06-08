import type { ContentEntryMap, CollectionEntry } from 'astro:content';
import { calculateAbsoluteDate } from '../utils/dateUtils';
import type { CourseConfig } from '../types';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// Load course configuration
const courseConfigPath = path.join(process.cwd(), 'src', 'courseConfig.yaml');
const courseConfig = yaml.load(fs.readFileSync(courseConfigPath, 'utf8')) as CourseConfig;

export function onContentLoaded({ entries }: { entries: ContentEntryMap }) {
    // Process each collection
    for (const [collection, docs] of Object.entries(entries)) {
        // Process each document in the collection
        for (const doc of docs as CollectionEntry<any>[]) {
            const data = doc.data;

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
        }
    }
} 