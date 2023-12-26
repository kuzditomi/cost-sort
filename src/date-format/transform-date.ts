import { format, parse } from "date-fns";

/**
 * Tries formatting the given date string using input and output format.
 * Returns input date on failure.
 */
export function transformDate(date: string, inputFormat: string, outputFormat: string) {
    try {
        const defaultDate = new Date();
        defaultDate.setFullYear(1989, 1, 1);

        const parsedDate = parse(date, inputFormat, defaultDate);

        if (parsedDate === defaultDate) {
            return date;
        }

        return format(parsedDate, outputFormat);
    } catch (e) {
        console.error("something went wrong with date formatting", e);

        return date;
    }
}
