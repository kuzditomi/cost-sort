import { useState } from "react";
import { addResultToClipboard, createTableFromResult } from "./resultToClipboard";
import { useRecoilValue } from "recoil";
import { sortedResultState } from "../sorter/sorter.state";
import { useTransformDate } from "../date-format/useTransformDate";

export const Result: React.FC = () => {
    const sortetResult = useRecoilValue(sortedResultState);
    const [hasCopied, setHasCopied] = useState(false);
    const transformDate = useTransformDate();

    if (!sortetResult) {
        return <p>Something is wrong, there is no result.</p>;
    }

    const resultHTML = createTableFromResult(sortetResult,transformDate);

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
