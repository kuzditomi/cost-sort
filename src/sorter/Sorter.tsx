import { useCallback, useState } from "react";
import "./sorter.scss";
import clsx from "clsx";
import { CostDetails } from "./CostDetails";
import { CostCategoryPicker } from "./CostCategoryPicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { categorizedIndexesAtom } from "./sorter.state";
import { costsState } from "../import-drop/import-drop.state";

export const Sorter: React.FC = () => {
    const [selectedCostIndex, setSelectedCostIndex] = useState(-1);
    const [categorizedIndexes, setCategorizedIndexes] = useRecoilState(categorizedIndexesAtom);

    const costs = useRecoilValue(costsState);
    const selectedCost = costs[selectedCostIndex];
    const selectedHeaderData = useRecoilValue(headersDataSelector);

    const next = useCallback(() => {
        if (costs.length > selectedCostIndex + 1) {
            setSelectedCostIndex(selectedCostIndex + 1);
        }
    }, [costs, selectedCostIndex, setSelectedCostIndex]);

    return (
        <div>
            <div className="sorter-container">
                <div className="costs">
                    {costs.map((cost, index) => (
                        <div
                            className={clsx("cost-row", index === selectedCostIndex ? "selected" : null)}
                            key={index}
                            onClick={() => {
                                setSelectedCostIndex(index);
                            }}
                        >
                            <div className="label">
                                {cost[selectedHeaderData.specialHeaders.dateHeader]} -{" "}
                                {cost[selectedHeaderData.specialHeaders.nameHeader]}
                            </div>
                            <div className="badges">{categorizedIndexes.has(index) ? "✓" : null}</div>
                        </div>
                    ))}
                </div>
                <div className="cost-editor">
                    {selectedCost ? (
                        <>
                            <CostDetails costIndex={selectedCostIndex} />
                            <CostCategoryPicker
                                cost={selectedCost}
                                onCategoryPick={(category) => {
                                    setCategorizedIndexes(categorizedIndexes.set(selectedCostIndex, category));
                                    next();
                                }}
                                onIgnore={() => {
                                    // mutation bad. hmmm
                                    categorizedIndexes.delete(selectedCostIndex);
                                    setCategorizedIndexes(categorizedIndexes);
                                    next();
                                }}
                                onSelectAsIncome={() => {
                                    next();
                                }}
                            />
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
