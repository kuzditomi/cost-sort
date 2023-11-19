import { atom, selector, useRecoilState } from "recoil";
import { SortResult, SortResultEntry } from "../types";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { costsState } from "../import-drop/import-drop.state";

export const categorizedIndexesAtom = atom({
    key: "categorizedIndexes",
    default: new Map(),
});

export const sortedResultState = selector<SortResult>({
    key: "sortedResult", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const selectedHeaderData = get(headersDataSelector);
        const costs = get(costsState);

        const result = Array.from(get(categorizedIndexesAtom).entries()).map(([index, category]) => {
            return {
                name: costs[index][selectedHeaderData.specialHeaders.nameHeader],
                date: costs[index][selectedHeaderData.specialHeaders.dateHeader],
                amount: costs[index][selectedHeaderData.specialHeaders.amountHeader],
                category,
            } as SortResultEntry;
        });

        return {
            entries: result,
        };
    },
});