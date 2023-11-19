import "./header-picker.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { amountHeaderAtom, dateHeaderAtom, nameHeaderAtom, selectedHeadersAtom } from "./header-picker.state";
import { importedCSVDataState } from "../import-drop/import-drop.state";

export const HeaderPicker: React.FC = () => {
    const [selectedHeaders, setSelectedHeaders] = useRecoilState(selectedHeadersAtom);
    const [dateHeader, setDateHeaderName] = useRecoilState(dateHeaderAtom);
    const [nameHeader, setNameHeaderName] = useRecoilState(nameHeaderAtom);
    const [amountHeader, setAmountHeaderName] = useRecoilState(amountHeaderAtom);

    const csvData = useRecoilValue(importedCSVDataState);

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
                </div>
            </div>
        </div>
    );
};
