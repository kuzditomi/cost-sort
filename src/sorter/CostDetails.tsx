import { format, parse } from "date-fns";
import { HeadersData } from "../types";
import { useEffect, useRef, useState } from "react";

export const CostDetails: React.FC<{
    headersData: HeadersData;
    cost: any;
}> = ({ cost, headersData }) => {
    const dateValue = cost[headersData.specialHeaders.dateHeader];
    const [name, setName] = useState("");
    const nameInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setName(cost[headersData.specialHeaders.nameHeader]);
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
                        <b>{cost[headersData.specialHeaders.amountHeader]}</b>
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
                            cost[headersData.specialHeaders.nameHeader] = e.target.value;
                        }}
                    />
                </div>
            </div>
            <div>
                {headersData.allHeadersToDisplay
                    .filter((header) => !Object.values(headersData.specialHeaders).includes(header))
                    .map((header) => (
                        <div key={header}>
                            <b>{header}</b>: {cost[header]}
                        </div>
                    ))}
            </div>
        </div>
    );
};
