import { FileUploader } from "react-drag-drop-files";
import "./import-drop.scss";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { importedCSVDataState } from "./import-drop.state";
import Papa from "papaparse";
import { Cost } from "../types";

const fileTypes = ["CSV"];

export const ImportDrop: React.FC = () => {
    const [CSVData, setCSVData] = useRecoilState(importedCSVDataState);
    
    const onFileSelected = useCallback(
        (file: File) => {
            if (!file) {
                return;
            }

            Papa.parse<Cost>(file, {
                header: true,
                complete: (results) => {
                    setCSVData(results);
                },
            });
        },
        [setCSVData]
    );

    return (
        <div>
            <h3>Please drop a csv with headers</h3>

            <FileUploader handleChange={onFileSelected} name="file" types={fileTypes} classes="uploader" />
        </div>
    );
};
