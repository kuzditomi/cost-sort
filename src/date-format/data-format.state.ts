import { atom, selector } from "recoil";

export const inputDateFormatAtom = atom<string>({
    key: "inputDateFormat",
    default: "yyyyMMdd",
});

export const outputDateFormatAtom = atom<string>({
    key: "outputDateFormat",
    default: "dd/MM/yyyy",
});

export const dateFormatsSelector = selector<[string, string]>({
    key: "dateFormats",
    get: ({ get }) => {
        return [get(inputDateFormatAtom), get(outputDateFormatAtom)];
    },
});
