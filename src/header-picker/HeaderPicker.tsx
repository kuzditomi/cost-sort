import "./header-picker.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { amountHeaderAtom, currencyHeaderAtom, dateHeaderAtom, nameHeaderAtom, selectedHeadersAtom } from "./header-picker.state";
import { importedCSVDataState } from "../import-drop/import-drop.state";
import { useEffect } from "react";
import clsx from "clsx";

export const HeaderPicker: React.FC = () => {
    const [selectedHeaders, setSelectedHeaders] = useRecoilState(selectedHeadersAtom);
    const [dateHeader, setDateHeaderName] = useRecoilState(dateHeaderAtom);
    const [nameHeader, setNameHeaderName] = useRecoilState(nameHeaderAtom);
    const [amountHeader, setAmountHeaderName] = useRecoilState(amountHeaderAtom);
    const [currencyHeader, setCurrencyHeaderName] = useRecoilState(currencyHeaderAtom);

    useEffect(() => {
        // there are headers but nothing is selected yet
        if (csvData.meta.fields?.length && !nameHeader && !dateHeader && !amountHeader && !currencyHeader ) {
            const newSelectedHeaders = [];

            for (let header of csvData.meta.fields) {
                if (header.toLowerCase().includes("name") || header.toLowerCase().includes("description")) {
                    setNameHeaderName(header);
                    newSelectedHeaders.push(header);
                } else if (header.toLowerCase().includes("amount")) {
                    setAmountHeaderName(header);
                    newSelectedHeaders.push(header);
                } else if (header.toLowerCase().includes("date")) {
                    setDateHeaderName(header);
                    newSelectedHeaders.push(header);
                } else if (header.toLowerCase().includes("currency")) {
                    setCurrencyHeaderName(header);
                    newSelectedHeaders.push(header);
                }
            }

            setSelectedHeaders([...selectedHeaders, ...newSelectedHeaders]);
        }
    }, []);

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
                                        } else if (![dateHeader, nameHeader, amountHeader, currencyHeader].includes(header)) {
                                            setSelectedHeaders(selectedHeaders.filter((h) => h != header));
                                        }
                                    }}
                                />
                                {header}
                            </label>
                            <div className="button-container">
                                <button
                                    className={clsx(dateHeader === header && "active")}
                                    onClick={() => {
                                        setDateHeaderName(header);
                                        setSelectedHeaders([...selectedHeaders, header]);
                                    }}
                                >
                                    date
                                </button>
                                <button
                                    className={clsx(nameHeader === header && "active")}
                                    onClick={() => {
                                        setNameHeaderName(header);
                                        setSelectedHeaders([...selectedHeaders, header]);
                                    }}
                                >
                                    name
                                </button>
                                <button
                                    className={clsx(amountHeader === header && "active")}
                                    onClick={() => {
                                        setAmountHeaderName(header);
                                        setSelectedHeaders([...selectedHeaders, header]);
                                    }}
                                >
                                    amount
                                </button>
                                <button
                                    className={clsx(currencyHeader === header && "active")}
                                    onClick={() => {
                                        setCurrencyHeaderName(header);
                                        setSelectedHeaders([...selectedHeaders, header]);
                                    }}
                                >
                                    currency
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
