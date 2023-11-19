import { format, parse } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { headersDataSelector } from "../header-picker/header-picker.state";

export const CostDetails: React.FC<{
    cost: any;
}> = ({ cost }) => {
    const selectedHeaderData = useRecoilValue(headersDataSelector);
    const [name, setName] = useState("");

    const nameInput = useRef<HTMLInputElement>(null);
    const dateValue = cost[selectedHeaderData.specialHeaders.dateHeader];

    useEffect(() => {
        setName(cost[selectedHeaderData.specialHeaders.nameHeader]);
        if (nameInput.current) {
            nameInput.current.focus();
            setTimeout(() => {
                if (nameInput.current) nameInput.current.setSelectionRange(0, nameInput.current.value.length);
            }, 200);
        }
    }, [cost]);

    return (
        <div className="cost-details">
            <div className="special-headers">
                <div>
                    <div className="date">{format(parse(dateValue, "yyyymmdd", new Date()), "yyyy.mm.dd")}</div>
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

                            // mutation bad? hmmm
                            cost[selectedHeaderData.specialHeaders.nameHeader] = e.target.value;
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
