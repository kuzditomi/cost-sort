import { useRecoilValue } from "recoil";
import { categoriesAtom } from "../category-settings/categories.state";

export const CostCategoryPicker: React.FC<{
    cost: any;
    onCategoryPick: (category: string) => void;
    onIgnore: () => void;
    onSelectAsIncome: () => void;
}> = ({ cost, onCategoryPick, onIgnore, onSelectAsIncome }) => {
    const categories = useRecoilValue(categoriesAtom);

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
