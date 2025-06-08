import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { calculateAbsoluteDate } from '../utils/dateUtils';
import type { CourseConfig } from '../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import { parseMarkdownWithFrontmatter } from './convertToRelativeDates';

dayjs.extend(utc);
dayjs.extend(tz);

// Load course configuration
const courseConfigPath = path.join(process.cwd(), 'src', 'courseConfig.yaml');
const courseConfig = yaml.load(fs.readFileSync(courseConfigPath, 'utf8')) as CourseConfig;

interface ValidationResult {
    file: string;
    type: 'lecture' | 'homework' | 'exam';
    field: string;
    originalDate: string;
    calculatedDate: string;
    matches: boolean;
}

function validateDate(
    file: string,
    type: 'lecture' | 'homework' | 'exam',
    field: string,
    originalDate: string,
    relativeDate: any
): ValidationResult {
    const calculatedDate = calculateAbsoluteDate(relativeDate, courseConfig).toISOString();
    const originalDateObj = dayjs.tz(originalDate, courseConfig.timeZone);
    const calculatedDateObj = dayjs.tz(calculatedDate, courseConfig.timeZone);

    return {
        file,
        type,
        field,
        originalDate,
        calculatedDate,
        matches: originalDateObj.isSame(calculatedDateObj)
    };
}

function validateFile(filePath: string): ValidationResult[] {
    const content = fs.readFileSync(filePath, 'utf8');
    let data: any;
    if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
        try {
            const parsed = parseMarkdownWithFrontmatter(content);
            data = parsed.frontmatter;
        } catch (err) {
            console.error(`❌ Error parsing frontmatter in ${filePath}:`, (err as Error).message);
            return [];
        }
    } else {
        data = yaml.load(content) as any;
    }
    const results: ValidationResult[] = [];

    // Determine file type from path
    const type = filePath.includes('/lectures/') ? 'lecture' :
        filePath.includes('/homeworks/') ? 'homework' : 'exam';

    // Validate based on file type
    if (type === 'lecture' && data.date && data.relative_date) {
        results.push(validateDate(filePath, type, 'date', data.date, data.relative_date));
    }

    if (type === 'homework') {
        if (data.release && data.relative_release) {
            results.push(validateDate(filePath, type, 'release', data.release, data.relative_release));
        }
        if (data.due && data.relative_due) {
            results.push(validateDate(filePath, type, 'due', data.due, data.relative_due));
        }
    }

    if (type === 'exam' && data.date && data.relative_date) {
        results.push(validateDate(filePath, type, 'date', data.date, data.relative_date));
    }

    return results;
}

function validateAllFiles(): ValidationResult[] {
    const results: ValidationResult[] = [];
    const contentDir = path.join(process.cwd(), 'src', 'content');

    // Validate lectures
    const lectureFiles = fs.readdirSync(path.join(contentDir, 'docs', 'lectures'))
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(contentDir, 'docs', 'lectures', f));

    // Validate homeworks
    const homeworkFiles = fs.readdirSync(path.join(contentDir, 'docs', 'homeworks'))
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(contentDir, 'docs', 'homeworks', f));

    // Validate exams
    const examFiles = fs.readdirSync(path.join(contentDir, 'exams'))
        .filter(f => f.endsWith('.yaml'))
        .map(f => path.join(contentDir, 'exams', f));

    // Process all files
    [...lectureFiles, ...homeworkFiles, ...examFiles].forEach(file => {
        results.push(...validateFile(file));
    });

    return results;
}

// Run validation
const results = validateAllFiles();

// Print results
console.log('\nDate Validation Results:');
console.log('=======================\n');

const mismatches = results.filter(r => !r.matches);
if (mismatches.length === 0) {
    console.log('✅ All date conversions match!');
} else {
    console.log(`❌ Found ${mismatches.length} mismatches:\n`);
    mismatches.forEach(m => {
        console.log(`File: ${m.file}`);
        console.log(`Type: ${m.type}`);
        console.log(`Field: ${m.field}`);
        console.log(`Original: ${m.originalDate}`);
        console.log(`Calculated: ${m.calculatedDate}`);
        console.log('---');
    });
}

// Print summary
console.log('\nSummary:');
console.log(`Total files checked: ${results.length}`);
console.log(`Matching conversions: ${results.length - mismatches.length}`);
console.log(`Mismatched conversions: ${mismatches.length}`); 