import { useState } from "react";

export const Result: React.FC<{
    result: any;
}> = ({ result }) => {
    const [hasCopied, setHasCopied] = useState(false);

    if (!result) {
        return <p>Something is wrong, there is no result.</p>;
    }

    return (
        <div className="result">
            <h2>Result</h2>
            <div>
                <textarea defaultValue={JSON.stringify(result)}></textarea>
            </div>
            <div>
                {hasCopied ? (
                    <p>Copied to clipboard!</p>
                ) : (
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(result));
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
