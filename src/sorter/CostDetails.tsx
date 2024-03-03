import { format, parse } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { headersDataSelector } from "../header-picker/header-picker.state";
import { costsState } from "../import-drop/import-drop.state";
import { useTransformDate } from "../date-format/useTransformDate";
import { exchangeRateHeader } from "./sorter.state";
import { useCurrency } from "./exchange/useCurrency";

export const CostDetails: React.FC<{
    costIndex: number;
}> = ({ costIndex }) => {
    const { isLoading, currenciesToEur } = useCurrency();
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

    const renderExchangeButton = () => {
        const currency = cost[selectedHeaderData.specialHeaders.currencyHeader];
        if (!currency || currency.toLocaleLowerCase() === "eur") {
            return null;
        }

        return (
            <button 
                style={{'background': 'red'}}
                onClick={() => {
                    const amount = Number(cost[selectedHeaderData.specialHeaders.amountHeader]);
                    const newAmount = amount / currenciesToEur[currency.toLocaleLowerCase()];

                    const newcosts = [...costs];
                    newcosts[costIndex] = {
                        ...costs[costIndex],
                        [selectedHeaderData.specialHeaders.amountHeader]: newAmount.toFixed(2),
                        [selectedHeaderData.specialHeaders.currencyHeader]: 'eur',
                    };
                    setCosts(newcosts);
                }}
            >
                --&gt; EUR
            </button>
        );
    };

    return (
        <div className="cost-details">
            <div className="special-headers">
                <div>
                    <div className="date">{transformDate(dateValue)}</div>
                    <div className="amount">
                        <b>{cost[selectedHeaderData.specialHeaders.amountHeader]}</b>
                    </div>
                    <div className="currency">
                        <b>{cost[selectedHeaderData.specialHeaders.currencyHeader]}</b>
                        {renderExchangeButton()}
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
                        onBlur={() => {
                            const newcosts = [...costs];
                            newcosts[costIndex] = {
                                ...costs[costIndex],
                                [selectedHeaderData.specialHeaders.nameHeader]: name,
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
