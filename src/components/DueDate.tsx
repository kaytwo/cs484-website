import { localizeTime, formatTime, calculateAbsoluteDate } from '../utils/dateUtils';

interface DueDateProps {
    relativeDate: {
        week: number;
        day: number;
        time: string;
    };
    label?: string;
}

export function DueDate({ relativeDate, label = "Due" }: DueDateProps) {
    const date = formatTime(localizeTime(calculateAbsoluteDate(relativeDate)));
    return <>{`**${label}**: ${date}`}</>;
} 