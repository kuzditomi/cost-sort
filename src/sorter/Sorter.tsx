import { useCallback, useState } from "react";
import "./sorter.scss";
import clsx from "clsx";

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
            <h3>Sorter</h3>

            <div className="sorter-container">
                <div className="costs">{costs.map((cost, i) => renderCostRow(cost, i))}</div>
            </div>
        </div>
    );
};
