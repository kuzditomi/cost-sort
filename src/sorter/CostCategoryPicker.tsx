const categories = ["food", "utilities", "fun"] as const;

export const CostCategoryPicker: React.FC<{
    cost: any;
    onCategoryPick: (category: string) => void;
    onIgnore: () => void;
    onSelectAsIncome: () => void;
}> = ({ cost, onCategoryPick, onIgnore, onSelectAsIncome }) => {
    if (!cost) {
        return null;
    }

    return (
        <div className="cost-category-picker">
            <div>
                {categories.map((category) => (
                    <button key={category} onClick={() => onCategoryPick(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <div>
                <button onClick={() => onIgnore()}>ignore</button>
                <button onClick={() => onSelectAsIncome()}>income</button>
            </div>
        </div>
    );
};
