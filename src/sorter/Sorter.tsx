import { useCallback, useState } from "react";
import "./sorter.scss";
import clsx from "clsx";
import { CostDetails } from "./CostDetails";
import { CostCategoryPicker } from "./CostCategoryPicker";
import { useRecoilState, useRecoilValue } from "recoil";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { categorizedIndexesAtom } from "./sorter.state";
import { costsState } from "../import-drop/import-drop.state";
import { useDate } from "../date-format/transform-date";

export const Sorter: React.FC = () => {
    const [selectedCostIndex, setSelectedCostIndex] = useState(-1);
    const [categorizedIndexes, setCategorizedIndexes] = useRecoilState(categorizedIndexesAtom);

    const costs = useRecoilValue(costsState);
    const selectedHeaderData = useRecoilValue(headersDataSelector);

    const [getDateFrom] = useDate();

    // Sort costs by date ascending if dateHeader is set
    // TODO could do it right on import though...
    const sortedCosts =
        selectedHeaderData?.specialHeaders?.dateHeader
            ? [...costs].sort((a, b) => {
                return getDateFrom(a).getTime() - getDateFrom(b).getTime()
            })
            : costs;

    const selectedCost = sortedCosts[selectedCostIndex];

    const next = useCallback(() => {
        if (sortedCosts.length > selectedCostIndex + 1) {
            setSelectedCostIndex(selectedCostIndex + 1);
        }
    }, [sortedCosts, selectedCostIndex, setSelectedCostIndex]);

    return (
        <div>
            <div className="sorter-container">
                <div className="costs">
                    {sortedCosts.map((cost, index) => (
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
