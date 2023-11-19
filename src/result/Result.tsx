import { useState } from "react";
import { addResultToClipboard, createTableFromResult } from "./resultToClipboard";
import { SortResult } from "../types";

export const Result: React.FC<{
    result: SortResult;
}> = ({ result }) => {
    const [hasCopied, setHasCopied] = useState(false);

    if (!result) {
        return <p>Something is wrong, there is no result.</p>;
    }

    const resultHTML = createTableFromResult(result);

    return (
        <div className="result">
            <h2>Result</h2>
            <div>
                <textarea defaultValue={resultHTML}></textarea>
            </div>
            <div>
                {hasCopied ? (
                    <p>Copied to clipboard!</p>
                ) : (
                    <button
                        onClick={() => {
                            addResultToClipboard(resultHTML);
                            setHasCopied(true);
                        }}
                    >
                        Copy to clipboard
                    </button>
                )}
            </div>
        </div>
    );
};
