import { SortResult } from "../types";

export const createTableFromResult = (result: SortResult, dateTransformer: (date: string) => string): string => {
    const content = result.entries.map((entry) => {
        const entryContent = `<td>${dateTransformer(entry.date)}</td><td>${entry.amount}</td><td>${
            entry.category
        }</td><td>${entry.name}</td>`;

        return `<tr>${entryContent}</tr>`;
    });

    const html = `<table>${content}</table>`;
    return html;
};

export const addResultToClipboard = (html: string) => {
    const clipboardItem = new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([html], { type: "text/plain" }),
    });
    navigator.clipboard.write([clipboardItem]);
};
