import React, { useCallback, useState } from "react";
import { ImportDrop } from "../import-drop/ImportDrop";
import { HeaderPicker } from "../header-picker/HeaderPicker";
import { Sorter } from "../sorter/Sorter";
import { Result } from "../result/Result";
import { WizardFrame } from "./WizardFrame";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { useRecoilValue } from "recoil";
import { importedCSVDataState } from "../import-drop/import-drop.state";
import { CategorySettings } from "../category-settings/CategorySettings";
import { DateFormat } from "../date-format/DateFormat";
import { dateFormatsSelector } from "../date-format/data-format.state";

type WizardState = "start" | "header-picking" | "date-format" | "sorting" | "result";

export const ImportWizard: React.FC = ({}) => {
    const [wizardState, setWizardState] = useState<WizardState>("start");

    const selectedHeaderData = useRecoilValue(headersDataSelector);
    const CSVData = useRecoilValue(importedCSVDataState);
    const [inputDateFormat, outputDateFormat] = useRecoilValue(dateFormatsSelector);

    const changeState = useCallback((state: WizardState) => () => setWizardState(state), [setWizardState]);

    if (wizardState === "start") {
        return (
            <WizardFrame nextDisabled={!CSVData.data} onNext={changeState("header-picking")}>
                <CategorySettings />
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
                onNext={changeState("date-format")}
                nextDisabled={!canProgressFromHeaderPricker}
            >
                <HeaderPicker />
            </WizardFrame>
        );
    }

    if (wizardState === "date-format") {
        const canProgressFromDateFormat =inputDateFormat && outputDateFormat;

        return (
            <WizardFrame
                onPrev={changeState("header-picking")}
                onNext={changeState("sorting")}
                nextDisabled={!canProgressFromDateFormat}
            >
                <DateFormat />
            </WizardFrame>
        );
    }

    if (wizardState === "sorting") {
        return (
            <WizardFrame onNext={changeState("result")} onPrev={changeState("date-format")}>
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
