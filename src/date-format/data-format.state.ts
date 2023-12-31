import { atom, selector } from "recoil";

export const inputDateFormatAtom = atom<string>({
    key: "inputDateFormat",
    default: "yyyymmdd",
});

export const outputDateFormatAtom = atom<string>({
    key: "outputDateFormat",
    default: "yyyy.mm.dd.",
});

export const dateFormatsSelector = selector<[string, string]>({
    key: "dateFormats",
    get: ({ get }) => {
        return [get(inputDateFormatAtom), get(outputDateFormatAtom)];
    },
});
