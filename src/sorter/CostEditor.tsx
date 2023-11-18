import { CostCategoryPicker } from "./CostCategoryPicker";
import { HeadersData, SpecialHeaders } from "../types";
import { CostDetails } from "./CostDetails";

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
            <CostDetails cost={cost} headersData={headersData} />
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
