import { CostCategoryPicker } from "./cost-category-picket";

export const CostEditor: React.FC<{
    headersToDisplay: string[];
    cost: any;
    next: () => void;
}> = ({ cost, headersToDisplay, next }) => {
    if (!cost) {
        return null;
    }

    return (
        <div className="cost-editor">
            <div className="cost-details">
                {headersToDisplay.map((header) => (
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
