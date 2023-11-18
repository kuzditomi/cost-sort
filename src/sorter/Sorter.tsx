import { useCallback, useState } from "react";
import "./sorter.scss";
import clsx from "clsx";
import { CostEditor } from "./cost-editor";

export const Sorter: React.FC<{
    costs: any[];
    headers: string[];
    dateHeader: string;
    nameHeader: string;
}> = ({ costs, headers, dateHeader, nameHeader }) => {
    const [selectedCostIndex, setSelectedCostIndex] = useState(-1);

    const renderCostRow = useCallback(
        (cost: any, index: number) => {
            return (
                <div
                    className={clsx("cost-row", index === selectedCostIndex ? "selected" : null)}
                    key={index}
                    onClick={() => {
                        setSelectedCostIndex(index);
                    }}
                >
                    {cost[dateHeader]} - {cost[nameHeader]}
                </div>
            );
        },
        [headers, selectedCostIndex]
    );

    return (
        <div>
            <div className="sorter-container">
                <div className="costs">{costs.map((cost, i) => renderCostRow(cost, i))}</div>
                <CostEditor
                    cost={costs[selectedCostIndex]}
                    headersToDisplay={headers}
                    next={() => {
                        if (costs.length > selectedCostIndex + 1) {
                            setSelectedCostIndex(selectedCostIndex + 1);
                        }
                    }}
                />
            </div>
        </div>
    );
};
