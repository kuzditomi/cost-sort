import { format, parse } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { costsState } from "../import-drop/import-drop.state";
import { useTransformDate } from "../date-format/useTransformDate";

export const CostDetails: React.FC<{
    costIndex: number;
}> = ({ costIndex }) => {
    const [costs, setCosts] = useRecoilState(costsState);
    const cost = costs[costIndex];
    const selectedHeaderData = useRecoilValue(headersDataSelector);

    const [name, setName] = useState("");
    const nameInput = useRef<HTMLInputElement>(null);
    const dateValue = cost[selectedHeaderData.specialHeaders.dateHeader];

    const transformDate = useTransformDate();

    useEffect(() => {
        setName(cost[selectedHeaderData.specialHeaders.nameHeader]);

        if (nameInput.current) {
            nameInput.current.focus();
            setTimeout(() => {
                if (nameInput.current) nameInput.current.setSelectionRange(0, nameInput.current.value.length);
            }, 200);
        }
    }, [costIndex]);

    return (
        <div className="cost-details">
            <div className="special-headers">
                <div>
                    <div className="date">{transformDate(dateValue)}</div>
                    <div className="amount">
                        <b>{cost[selectedHeaderData.specialHeaders.amountHeader]}</b>
                    </div>
                </div>
                <div className="name">
                    <input
                        ref={nameInput}
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        onBlur={()=>{
                            const newcosts = [
                                ...costs
                            ];
                            newcosts[costIndex] = {
                                ...costs[costIndex],
                                [selectedHeaderData.specialHeaders.nameHeader] : name
                            };
                            setCosts(newcosts);
                        }}
                    />
                </div>
            </div>
            <div>
                {selectedHeaderData.allHeadersToDisplay
                    .filter((header) => !Object.values(selectedHeaderData.specialHeaders).includes(header))
                    .map((header) => (
                        <div key={header}>
                            <b>{header}</b>: {cost[header]}
                        </div>
                    ))}
            </div>
        </div>
    );
};
