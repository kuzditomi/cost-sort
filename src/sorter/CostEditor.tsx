import { CostCategoryPicker } from "./CostCategoryPicker";
import { HeadersData, SpecialHeaders } from "../types";

export const CostEditor: React.FC<{
    headersData: HeadersData;
    cost: any;
    next: () => void;
}> = ({ cost, headersData, next }) => {
    if (!cost) {
        return null;
    }

    return (
        <div className="cost-editor">
            <div className="cost-details">
                {headersData.allHeadersToDisplay.map((header) => (
                    <div key={header}>
                        <b>{header}</b>: {cost[header]}
                    </div>
                ))}
            </div>
            <CostCategoryPicker
                cost={cost}
                onCategoryPick={(category) => {
                    console.log(cost, category);
                    next();
                }}
                onIgnore={() => next()}
                onSelectAsIncome={() => {
                    console.log(cost, "income");
                    next();
                }}
            />
        </div>
    );
};
