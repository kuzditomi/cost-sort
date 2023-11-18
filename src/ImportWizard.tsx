import { useCallback, useState } from "react";
import { ImportDrop } from "./import-drop/ImportDrop";
import { HeaderPicker } from "./header-picker/HeaderPicker";
import Papa from "papaparse";
import { Sorter } from "./sorter/Sorter";
import { HeadersData } from "./types";
import { Result } from "./result/Result";

type WizardState = "start" | "header-picking" | "sorting" | "result";

export const ImportWizard: React.FC = ({}) => {
    const [wizardState, setWizardState] = useState<WizardState>("start");
    const [CSVData, setCSVData] = useState<Papa.ParseResult<unknown> | null>(null);
    const [selectedHeadersData, setSelectedHeadersData] = useState<HeadersData | null>(null);
    const [sortedResult, setSortedResult] = useState<any | null>(null);

    const onFileSelected = useCallback(
        (file: File) => {
            if (!file) {
                return;
            }

            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setCSVData(results);
                    setWizardState("header-picking");
                },
            });
        },
        [setCSVData, setWizardState]
    );

    if (wizardState === "start") {
        return <ImportDrop onChange={onFileSelected} />;
    }

    if (wizardState === "header-picking") {
        if (!CSVData) {
            return <b>Something is wrong, no file specified</b>;
        }

        return (
            <HeaderPicker
                csvData={CSVData}
                onHeaderPicked={(headersData) => {
                    setSelectedHeadersData(headersData);
                    setWizardState("sorting");
                }}
            />
        );
    }

    if (wizardState === "sorting") {
        if (!selectedHeadersData) {
            return <p>something is wrong with selected headers</p>;
        }

        return (
            <Sorter
                costs={CSVData!.data}
                headersData={selectedHeadersData}
                onSorted={(result) => {
                    setSortedResult(result);
                    setWizardState("result");
                }}
            />
        );
    }

    if (wizardState === "result") {
        return <Result result={sortedResult} />;
    }

    return null;
};
