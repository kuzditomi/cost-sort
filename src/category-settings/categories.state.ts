import { atom } from "recoil";

export const categoriesAtom = atom<string[]>({
    key: "categories",
    default: (JSON.parse(localStorage.getItem("categories") || "[]") as string[]) || [],
    effects: [
        ({ onSet }) => {
            onSet((newValue) => {
                localStorage.setItem("categories", JSON.stringify(newValue || []));
            });
        },
    ],
});
