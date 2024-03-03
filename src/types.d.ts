export type HeadersData = {
    allHeadersToDisplay: string[];
    specialHeaders: SpecialHeaders;
};

export type SpecialHeaders = {
    amountHeader: string;
    nameHeader: string;
    dateHeader: string;
    currencyHeader: string;
};

export type Cost = Record<keyof SpecialHeaders | string, string>;

export type SortResultEntry = {
    name: string;
    date: string;
    category: string;
    amount: string;
};

export type SortResult = {
    entries: SortResultEntry[];
};
