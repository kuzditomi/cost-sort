import "./category-settings.scss";
import { useRecoilState } from "recoil";
import { categoriesAtom } from "./categories.state";

export const CategorySettings: React.FC = () => {
    const [categories, setCategories] = useRecoilState(categoriesAtom);

    return (
        <div className="category-settings">
            <h3>Please edit categories to use</h3>
            <button
                onClick={() => {
                    setCategories([...categories, ""]);
                }}
            >
                +
            </button>
            <ul>
                {categories.map((category, i) => (
                    <li key={i}>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => {
                                const newCategories = [...categories];
                                newCategories[i] = e.target.value || "";
                                setCategories(newCategories);
                            }}
                        />{" "}
                        <button
                            onClick={() => {
                                const newCategories = categories.filter((c, index) => i != index);
                                setCategories(newCategories);
                            }}
                        >
                            -
                        </button>
                        <button
                            disabled={i == 0}
                            onClick={() => {
                                const newCategories = [...categories];
                                if (i > 0) {
                                    const tmp = newCategories[i - 1];
                                    newCategories[i - 1] = category;
                                    newCategories[i] = tmp;
                                    setCategories(newCategories);
                                }
                            }}
                        >
                            ↑
                        </button>
                        <button
                            disabled={i == categories.length - 1}
                            onClick={() => {
                                const newCategories = [...categories];
                                if (i < categories.length - 1) {
                                    const tmp = newCategories[i + 1];
                                    newCategories[i + 1] = category;
                                    newCategories[i] = tmp;
                                    setCategories(newCategories);
                                }
                            }}
                        >
                            ↓
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
