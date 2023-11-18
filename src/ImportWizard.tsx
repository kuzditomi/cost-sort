import { useState } from "react";
import { ImportDrop } from "./import-drop/ImportDrop";
import { HeaderPicker } from "./header-picker/HeaderPicker";
import Papa from "papaparse";
import { Sorter } from "./sorter/Sorter";

type WizardState = "start" | "headerpicking" | "sorting";

export const ImportWizard: React.FC = ({}) => {
    const [wizardState, setWizardState] = useState<WizardState>("start");
    const [CSVData, setCSVData] = useState<Papa.ParseResult<unknown> | null>(null);
    const [selectedHeadersData, setSelectedHeadersData] = useState<[string[], string, string] | null>(null);

    if (wizardState === "start") {
        return (
            <ImportDrop
                onChange={(file) => {
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
                }}
            />
        );
    }

    if (wizardState === "headerpicking") {
        return (
            <HeaderPicker
                csvData={CSVData}
                onHeaderPicked={(...headersData) => {
                    setSelectedHeadersData(headersData);
                    setWizardState("sorting");
                }}
            />
        );
    }

    if (wizardState === "sorting") {
        if(!selectedHeadersData){
            return <p>something is wrong with selected headers</p>
        };

        const [headers, dateHeader, nameHeader] = selectedHeadersData;
        return <Sorter costs={CSVData!.data} headers={headers} dateHeader={dateHeader} nameHeader={nameHeader} />;
    }

    return null;
};
