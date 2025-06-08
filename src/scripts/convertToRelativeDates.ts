import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import type { CourseConfig } from '../types';

dayjs.extend(utc);
dayjs.extend(tz);

// Load course configuration
const courseConfigPath = path.join(process.cwd(), 'src', 'courseConfig.yaml');
const courseConfig = yaml.load(fs.readFileSync(courseConfigPath, 'utf8')) as CourseConfig;

interface DateInfo {
    absoluteDate: string;
    week: number;
    day: number;
    time: string;
}

function calculateRelativeDate(absoluteDate: string): DateInfo {
    const date = dayjs.tz(absoluteDate, courseConfig.timeZone);
    const semesterStart = dayjs.tz(courseConfig.semesterStartDate, courseConfig.timeZone);

    // Calculate week number, taking into account skipped weeks
    let week = 1;
    let currentDate = semesterStart;

    while (currentDate.isBefore(date, 'week')) {
        const nextWeekStart = currentDate.add(1, 'week');
        const isSkippedWeek = courseConfig.skippedWeeks.some(skip =>
            dayjs.tz(skip.calendarWeekStartDate, courseConfig.timeZone).isSame(nextWeekStart, 'week')
        );

        if (!isSkippedWeek) {
            week++;
        }
        currentDate = nextWeekStart;
    }

    // Calculate day number
    const dayOfWeek = date.format('dddd');
    const day = courseConfig.classDays.indexOf(dayOfWeek) + 1;

    // Get time
    const time = date.format('HH:mm:ss');

    return {
        absoluteDate,
        week,
        day,
        time
    };
}

export function parseMarkdownWithFrontmatter(content: string): { frontmatter: any; content: string } {
    // Accepts: ---\n(frontmatter)\n---\n(optional body)
    // Should also work if the body is empty (i.e., file ends after ---)
    const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)?$/);
    if (!match) {
        throw new Error('Invalid Markdown file format: missing frontmatter');
    }
    const frontmatter = yaml.load(match[1]);
    const markdownContent = match[2] || '';
    return { frontmatter, content: markdownContent };
}

function convertFile(filePath: string): void {
    console.log(`Processing: ${filePath}`); // Debugging output
    const content = fs.readFileSync(filePath, 'utf8');
    let data: any;
    let markdownContent = '';
    let modified = false;

    // Determine file type from path
    const isLecture = filePath.includes('/lectures/');
    const isHomework = filePath.includes('/homeworks/');
    const isExam = filePath.includes('/exams/');

    // Parse file based on type
    if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
        try {
            const parsed = parseMarkdownWithFrontmatter(content);
            data = parsed.frontmatter;
            markdownContent = parsed.content;
        } catch (err) {
            console.error(`❌ Error parsing frontmatter in ${filePath}:`, (err as Error).message);
            return;
        }
    } else {
        try {
            data = yaml.load(content);
        } catch (err) {
            console.error(`❌ Error parsing YAML in ${filePath}:`, (err as Error).message);
            return;
        }
    }

    // Convert dates based on file type
    if (isLecture && data.date && !data.relative_date) {
        const relativeDate = calculateRelativeDate(data.date);
        data.relative_date = {
            week: relativeDate.week,
            day: relativeDate.day,
            time: relativeDate.time
        };
        modified = true;
    }

    if (isHomework) {
        if (data.release && !data.relative_release) {
            const relativeDate = calculateRelativeDate(data.release);
            data.relative_release = {
                week: relativeDate.week,
                day: relativeDate.day,
                time: relativeDate.time
            };
            modified = true;
        }
        if (data.due && !data.relative_due) {
            const relativeDate = calculateRelativeDate(data.due);
            data.relative_due = {
                week: relativeDate.week,
                day: relativeDate.day,
                time: relativeDate.time
            };
            modified = true;
        }
    }

    if (isExam && data.date && !data.relative_date) {
        const relativeDate = calculateRelativeDate(data.date);
        data.relative_date = {
            week: relativeDate.week,
            day: relativeDate.day,
            time: relativeDate.time
        };
        modified = true;
    }

    // Write back to file if modified
    if (modified) {
        let newContent: string;
        if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
            newContent = `---\n${yaml.dump(data)}---\n${markdownContent}`;
        } else {
            newContent = yaml.dump(data);
        }
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Converted ${filePath}`);
    } else {
        console.log(`⏭️  Skipped ${filePath} (already converted or no dates to convert)`);
    }
}

function convertAllFiles(): void {
    const contentDir = path.join(process.cwd(), 'src', 'content');

    // Convert lectures
    const lectureFiles = fs.readdirSync(path.join(contentDir, 'docs', 'lectures'))
        .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
        .map(f => path.join(contentDir, 'docs', 'lectures', f));

    // Convert homeworks
    const homeworkFiles = fs.readdirSync(path.join(contentDir, 'docs', 'homeworks'))
        .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
        .map(f => path.join(contentDir, 'docs', 'homeworks', f));

    // Convert exams
    const examFiles = fs.readdirSync(path.join(contentDir, 'exams'))
        .filter(f => f.endsWith('.yaml'))
        .map(f => path.join(contentDir, 'exams', f));

    // Process all files
    [...lectureFiles, ...homeworkFiles, ...examFiles].forEach(convertFile);
}

// Run conversion
console.log('Starting date conversion...\n');
convertAllFiles();
console.log('\nConversion complete! Run `npm run validate-dates` to verify the conversions.'); 