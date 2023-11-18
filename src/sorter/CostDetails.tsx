import { format, parse } from "date-fns";
import { HeadersData } from "../types";

export const CostDetails: React.FC<{
    headersData: HeadersData;
    cost: any;
}> = ({ cost, headersData }) => {
    const dateValue = cost[headersData.specialHeaders.dateHeader];

    return (
        <div className="cost-details">
            <div className="special-headers">
                <div className="date">{format(parse(dateValue, "yyyymmdd", new Date()), "yyyy.mm.dd")}</div>
                <div className="label">
                    <b>{cost[headersData.specialHeaders.nameHeader]}</b>
                </div>
                <div className="amount">
                    <b>{cost[headersData.specialHeaders.amountHeader]}</b>
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
