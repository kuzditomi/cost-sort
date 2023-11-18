import { useCallback, useState } from "react";
import "./sorter.scss";
import clsx from "clsx";
import { HeadersData } from "../types";
import { CostDetails } from "./CostDetails";
import { CostCategoryPicker } from "./CostCategoryPicker";

export const Sorter: React.FC<{
    costs: any[];
    headersData: HeadersData;
    onSorted: (result:any) => void;
}> = ({ costs, headersData, onSorted }) => {
    const [selectedCostIndex, setSelectedCostIndex] = useState(-1);
    const [categorizedIndexes, setCategorizedIndexes] = useState<Map<number, string>>(new Map());

    const cost = costs[selectedCostIndex];

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
                                {cost[headersData.specialHeaders.dateHeader]} -{" "}
                                {cost[headersData.specialHeaders.nameHeader]}
                            </div>
                            <div className="badges">{categorizedIndexes.has(index) ? "✓" : null}</div>
                        </div>
                    ))}
                </div>
                <div className="cost-editor">
                    {cost ? (
                        <>
                            <CostDetails cost={cost} headersData={headersData} />
                            <CostCategoryPicker
                                cost={cost}
                                onCategoryPick={(category) => {
                                    setCategorizedIndexes(categorizedIndexes.set(selectedCostIndex, category));
                                    next();
                                }}
                                onIgnore={() => {
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
            <button
                onClick={() => {
                    const result = Array.from(categorizedIndexes.entries()).map(([index, category]) => {
                        return { cost: costs[index], category };
                    });

                    onSorted(result);
                }}
            >
                Next
            </button>
        </div>
    );
};
