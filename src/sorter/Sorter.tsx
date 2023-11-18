import { useCallback, useState } from "react";
import "./sorter.scss";
import clsx from "clsx";
import { CostEditor } from "./CostEditor";
import { HeadersData } from "../types";

export const Sorter: React.FC<{
    costs: any[];
    headersData: HeadersData;
}> = ({ costs, headersData }) => {
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
                    {cost[headersData.specialHeaders.dateHeader]} - {cost[headersData.specialHeaders.nameHeader]}
                </div>
            );
        },
        [headersData, selectedCostIndex, setSelectedCostIndex]
    );

    return (
        <div>
            <div className="sorter-container">
                <div className="costs">{costs.map((cost, i) => renderCostRow(cost, i))}</div>
                <CostEditor
                    cost={costs[selectedCostIndex]}
                    headersData={headersData}
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
