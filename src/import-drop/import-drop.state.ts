import { atom, selector } from "recoil";
import { Cost } from "../types";

export const importedCSVDataState = atom({
    key: "importedCSVData",
    default: {} as Papa.ParseResult<Cost>,
});

export const costsState = selector<Cost[]>({
    key: "costsState", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        return get(importedCSVDataState).data;
    },
});
