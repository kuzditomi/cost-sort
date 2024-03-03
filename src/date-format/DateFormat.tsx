import { useRecoilState, useRecoilValue } from "recoil";
import { dateHeaderAtom } from "../header-picker/header-picker.state";
import { costsState } from "../import-drop/import-drop.state";
import { useEffect, useState } from "react";
import { transformDate } from "./transform-date";
import { inputDateFormatAtom, outputDateFormatAtom } from "./data-format.state";

export const DateFormat: React.FC = () => {
    const dateHeader = useRecoilValue(dateHeaderAtom);
    const costs = useRecoilValue(costsState);
    const [inputDateFormat, setInputDateFormat] = useRecoilState(inputDateFormatAtom);
    const [outputDateFormat, setOutputDateFormat] = useRecoilState(outputDateFormatAtom);

    if (!costs?.length) {
        return <p>You need to have some cost in the list...</p>;
    }

    const exampleCost = costs[0];
    const exampleDate = exampleCost[dateHeader];
    const transformedDate = transformDate(exampleCost[dateHeader], inputDateFormat, outputDateFormat);

    return (
        <div className="date-format">
            <div>
                <h2>Input <a href="https://devhints.io/datetime#momentjs-format" target="_blank" rel="nofollow noopener noreferrer">(format cheetsheat)</a></h2>
                <h3>Example: {exampleDate}</h3>
                <div>
                    <select>
                        <option>custom</option>
                    </select>
                    <input
                        type="text"
                        value={inputDateFormat}
                        onChange={(evt) => setInputDateFormat(evt.target.value)}
                    />
                </div>
            </div>
            <div>
                <h2>Output</h2>
                <h3>Example: {transformedDate}</h3>
                <div>
                    <select>
                        <option>custom</option>
                    </select>
                    <input
                        type="text"
                        value={outputDateFormat}
                        onChange={(evt) => setOutputDateFormat(evt.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
