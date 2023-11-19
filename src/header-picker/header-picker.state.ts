import { atom, selector } from "recoil";
import { HeadersData } from "../types";

export const selectedHeadersAtom = atom({
    key: "selectedHeaderPicker",
    default: [] as string[],
});

export const nameHeaderAtom = atom({
    key: "nameHeaderAtom",
    default: "",
});

export const dateHeaderAtom = atom({
    key: "dateHeaderAtom",
    default: "",
});

export const amountHeaderAtom = atom({
    key: "amountHeaderAtom",
    default: "",
});

export const headersDataSelector = selector<HeadersData>({
    key: "headersData", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const allHeadersToDisplay = get(selectedHeadersAtom);
        const amountHeader = get(amountHeaderAtom);
        const nameHeader = get(nameHeaderAtom);
        const dateHeader = get(dateHeaderAtom);

        return {
            allHeadersToDisplay,
            specialHeaders: { amountHeader, nameHeader, dateHeader },
        };
    },
});
