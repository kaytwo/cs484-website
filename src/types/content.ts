export interface ContentData {
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