import React, { useCallback, useState } from "react";
import { ImportDrop } from "../import-drop/ImportDrop";
import { HeaderPicker } from "../header-picker/HeaderPicker";
import { Sorter } from "../sorter/Sorter";
import { Result } from "../result/Result";
import { WizardFrame } from "./WizardFrame";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { useRecoilValue } from "recoil";
import { importedCSVDataState } from "../import-drop/import-drop.state";

type WizardState = "start" | "header-picking" | "sorting" | "result";

export const ImportWizard: React.FC = ({}) => {
    const [wizardState, setWizardState] = useState<WizardState>("start");

    const selectedHeaderData = useRecoilValue(headersDataSelector);
    const CSVData = useRecoilValue(importedCSVDataState);

    const changeState = useCallback((state: WizardState) => () => setWizardState(state), [setWizardState]);

    if (wizardState === "start") {
        return (
            <WizardFrame nextDisabled={!CSVData.data} onNext={changeState("header-picking")}>
                <ImportDrop />
            </WizardFrame>
        );
    }

    if (wizardState === "header-picking") {
        if (!CSVData) {
            return <b>Something is wrong, no file specified</b>;
        }

        const canProgressFromHeaderPricker =
            selectedHeaderData.specialHeaders.amountHeader &&
            selectedHeaderData.specialHeaders.dateHeader &&
            selectedHeaderData.specialHeaders.nameHeader;

        return (
            <WizardFrame
                onPrev={changeState("start")}
                onNext={changeState("sorting")}
                nextDisabled={!canProgressFromHeaderPricker}
            >
                <HeaderPicker />
            </WizardFrame>
        );
    }

    if (wizardState === "sorting") {
        return (
            <WizardFrame
                onNext={changeState("result")}
                onPrev={changeState("header-picking")}
            >
                <Sorter />
            </WizardFrame>
        );
    }

    if (wizardState === "result") {
        return (
            <WizardFrame onPrev={changeState("sorting")}>
                <Result />
            </WizardFrame>
        );
    }

    return null;
};
