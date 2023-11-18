import { useState } from "react";
import "./header-picker.scss";

export const HeaderPicker: React.FC<{
    csvData: Papa.ParseResult<unknown> | null;
    onHeaderPicked: (headers: string[], dateHeader: string, nameHeader: string) => void;
}> = ({ csvData, onHeaderPicked }) => {
    const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
    const [dateHeaderName, setDateHeaderName] = useState<string>("");
    const [nameHeaderName, setNameHeaderName] = useState<string>("");

    if (!csvData) {
        return <b>Something is wrong, no file specified</b>;
    }

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
                                        } else {
                                            setSelectedHeaders(selectedHeaders.filter((h) => h != header));
                                        }
                                    }}
                                />
                                {header}
                            </label>
                            <div className="button-container">
                                <button onClick={() => setDateHeaderName(header)}>date</button>
                                <button onClick={() => setNameHeaderName(header)}>name</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <p>date header: {dateHeaderName || <span style={{ color: "red" }}>PLEASE PICK</span>}</p>
                    <p>name header: {nameHeaderName || <span style={{ color: "red" }}>PLEASE PICK</span>}</p>
                    <button
                        disabled={selectedHeaders.length === 0 || !dateHeaderName || !nameHeaderName}
                        onClick={() => onHeaderPicked(selectedHeaders, dateHeaderName, nameHeaderName)}
                    >
                        next
                    </button>
                </div>
            </div>
        </div>
    );
};
