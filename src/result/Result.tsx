import { useState } from "react";
import { addResultToClipboard, createTableFromResult } from "./resultToClipboard";
import { SortResult } from "../types";
import { useRecoilValue } from "recoil";
import { sortedResultState } from "../sorter/sorter.state";

export const Result: React.FC = () => {
    const sortetResult = useRecoilValue(sortedResultState);
    const [hasCopied, setHasCopied] = useState(false);

    if (!sortetResult) {
        return <p>Something is wrong, there is no result.</p>;
    }

    const resultHTML = createTableFromResult(sortetResult);

    return (
        <div className="result">
            <h2>Result</h2>
            <div>
                <textarea defaultValue={resultHTML}></textarea>
            </div>
            <div>
                <button
                    onClick={() => {
                        addResultToClipboard(resultHTML);
                        setHasCopied(true);

                        setTimeout(() => {
                            if (setHasCopied) {
                                setHasCopied(false);
                            }
                        }, 1500);
                    }}
                >
                    Copy to clipboard
                </button>
                {hasCopied ? <span>Copied to clipboard!</span> : null}
            </div>
        </div>
    );
};
