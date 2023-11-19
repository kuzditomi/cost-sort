import { useState } from "react";
import "./header-picker.scss";
import { HeadersData } from "../types";

export const HeaderPicker: React.FC<{
    csvData: Papa.ParseResult<unknown>;
    onHeaderPicked: (headersData: HeadersData) => void;
}> = ({ csvData, onHeaderPicked }) => {
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
    const [dateHeader, setDateHeaderName] = useState<string>("");
    const [nameHeader, setNameHeaderName] = useState<string>("");
    const [amountHeader, setAmountHeaderName] = useState<string>("");

    return (
        <div className="header-picker">
            <h3>Which header to include in sorting?</h3>
            <div>
                <ul>
                    {csvData.meta.fields!.map((header) => (
                        <li key={header} className={selectedHeaders.includes(header) ? "selected" : ""}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedHeaders.includes(header)}
                                    onChange={(evt) => {
                                        if (evt.target.checked) {
                                            setSelectedHeaders([...selectedHeaders, header]);
                                        } else if (![dateHeader, nameHeader, amountHeader].includes(header)) {
                                            setSelectedHeaders(selectedHeaders.filter((h) => h != header));
                                        }
                                    }}
                                />
                                {header}
                            </label>
                            <div className="button-container">
                                <button
                                    onClick={() => {
                                        setDateHeaderName(header);
                                        setSelectedHeaders([...selectedHeaders, header]);
                                    }}
                                >
                                    date
                                </button>
                                <button
                                    onClick={() => {
                                        setNameHeaderName(header);
                                        setSelectedHeaders([...selectedHeaders, header]);
                                    }}
                                >
                                    name
                                </button>
                                <button
                                    onClick={() => {
                                        setAmountHeaderName(header);
                                        setSelectedHeaders([...selectedHeaders, header]);
                                    }}
                                >
                                    amount
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <p>date header: {dateHeader || <span style={{ color: "red" }}>PLEASE PICK</span>}</p>
                    <p>name header: {nameHeader || <span style={{ color: "red" }}>PLEASE PICK</span>}</p>
                    <p>amount header: {amountHeader || <span style={{ color: "red" }}>PLEASE PICK</span>}</p>
                    <button
                        disabled={selectedHeaders.length === 0 || !dateHeader || !nameHeader || !amountHeader}
                        onClick={() =>
                            onHeaderPicked({
                                allHeadersToDisplay: selectedHeaders,
                                specialHeaders: {
                                    amountHeader,
                                    nameHeader,
                                    dateHeader,
                                },
                            })
                        }
                    >
                        next
                    </button>
                </div>
            </div>
        </div>
    );
};
