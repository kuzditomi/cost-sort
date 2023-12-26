import { useRecoilValue } from "recoil";
import { dateFormatsSelector } from "./data-format.state";
import { transformDate } from "./transform-date";
import { useCallback } from "react";

export function useTransformDate() {
    const [inputDateFormat, outputDateFormat] = useRecoilValue(dateFormatsSelector);

    return useCallback(
        (date: string) => {
            return transformDate(date, inputDateFormat, outputDateFormat);
        },
        [inputDateFormat, outputDateFormat]
    );
}
