import { format, parse } from "date-fns";
import { useRecoilValue } from "recoil";
import { dateFormatsSelector, inputDateFormatAtom } from "./data-format.state";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { Cost } from "../types";


const defaultDate = new Date();
defaultDate.setFullYear(1989, 1, 1);


/**
 * Tries formatting the given date string using input and output format.
 * Returns input date on failure.
 */
export function transformDate(date: string, inputFormat: string, outputFormat: string) {
    try {
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


export function useDate() {
    const inputDateFormat = useRecoilValue(inputDateFormatAtom);
    const selectedHeaderData = useRecoilValue(headersDataSelector);

    const getDateFrom = (cost: Cost) => {

        const dateField = cost[selectedHeaderData.specialHeaders.dateHeader];
        return parse(dateField, inputDateFormat, defaultDate);
    }

    return [getDateFrom]
}