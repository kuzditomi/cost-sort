import { useCallback, useState } from "react";
import { ImportDrop } from "./import-drop/ImportDrop";
import { HeaderPicker } from "./header-picker/HeaderPicker";
import Papa from "papaparse";
import { Sorter } from "./sorter/Sorter";
import { HeadersData } from "./types";

type WizardState = "start" | "headerpicking" | "sorting";

export const ImportWizard: React.FC = ({}) => {
    const [wizardState, setWizardState] = useState<WizardState>("start");
    const [CSVData, setCSVData] = useState<Papa.ParseResult<unknown> | null>(null);
    const [selectedHeadersData, setSelectedHeadersData] = useState<HeadersData | null>(null);

    const onFileSelected = useCallback(
        (file: File) => {
            if (!file) {
                return;
            }

            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setCSVData(results);
                    setWizardState("headerpicking");
                },
            });
        },
        [setCSVData, setWizardState]
    );

    if (wizardState === "start") {
        return <ImportDrop onChange={onFileSelected} />;
    }

    if (wizardState === "headerpicking") {
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

        return <Sorter costs={CSVData!.data} headersData={selectedHeadersData} />;
    }

    return null;
};
